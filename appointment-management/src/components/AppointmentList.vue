<template>
  <div class="max-w-7xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
    <router-link to="/add-appointment">
      <button class="flex items-center justify-center w-[250px] px-2 py-1 bg-blue-600 text-white rounded-lg border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6 transition duration-300">
        <span class="mr-2">+</span> Add New Appointment
      </button>
    </router-link>

    <div>
      <h2 class="text-3xl font-semibold text-center text-gray-800 mb-8">Appointment List</h2>

      <div class="overflow-x-auto max-h-[700px]">
        <div class="relative">
          <table class="min-w-full table-auto border-collapse text-gray-800">
            <thead class="sticky top-0 bg-gradient-to-r from-blue-200 to-blue-400 text-white z-10">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold">Title</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">Time</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <tr v-for="appointment in sortedAppointments" :key="appointment.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm font-medium text-gray-700">{{ appointment.title }}</td>
                <td class="px-6 py-4 text-sm font-medium text-gray-700">{{ formatDate(appointment.date) }}</td>
                <td class="px-6 py-4 text-sm font-medium text-gray-700">{{ appointment.time }}</td>
                <td class="px-6 py-4 text-sm font-medium">
                  <div class="relative inline-block text-left">
                    <button
                      @click="toggleMenu(appointment._id)"
                      class="text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class="h-5 w-5" />
                    </button>

                    <div
                      v-if="menuOpen === appointment._id"
                      class="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    >
                      <div class="py-1">
                        <router-link :to="`/edit-appointment/${appointment._id}`">
                          <button
                            @click="editAppointment(appointment)"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left rounded-md"
                          >
                            Edit
                          </button>
                        </router-link>

                        <button
                          @click="deleteAppointment(appointment._id)"
                          class="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-800 w-full text-left rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

library.add(faEllipsisVertical);

interface Appointment {
  id: string;
  title: string;
  date: string; 
  time: string;
}

export default defineComponent({
  name: 'AppointmentList',
  components: {
    FontAwesomeIcon
  },
  
  setup() {
    const store = useStore();
    const menuOpen = ref<string | null>(null); 

    onMounted(() => {
      store.dispatch('fetchAppointments');
    });

    const appointments = computed(() => store.getters.getAppointments);
    
    const convertTo24HourFormat = (time: string) => {
      const [hours, minutes, period] = time.split(/[:\s]/);
      let hours24 = parseInt(hours, 10);

      if (period.toLowerCase() === 'pm' && hours24 !== 12) {
        hours24 += 12; 
      } else if (period.toLowerCase() === 'am' && hours24 === 12) {
        hours24 = 0;
      }

      return `${hours24.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    };

    const formatDate = (date: string) => {
      if (!date) {
        console.error("Invalid date format:", date);
        return ""; 
      }
      
      const isoDate = new Date(date);
      if (!isNaN(isoDate.getTime())) {
        return isoDate.toLocaleDateString('en-US');
      }

      const parts = date.split('/');
      if (parts.length === 3) {
        const [month, day, year] = parts;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }

      console.error("Unrecognized date format:", date);
      return "";
    };

    const sortedAppointments = computed(() => {
  return appointments.value
    .slice() 
    .sort((a : Appointment, b: Appointment) => {
      const timeA = convertTo24HourFormat(a.time);
      const timeB = convertTo24HourFormat(b.time);

      const formattedDateA = formatDate(a.date);
      const formattedDateB = formatDate(b.date);

      if (!formattedDateA || !formattedDateB) return 0;

      const dateA = new Date(formattedDateA);
      const dateB = new Date(formattedDateB);

      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime();
      }

      if (timeA !== timeB) {
        return timeA.localeCompare(timeB); 
      }

      return 0;
    });
});

    const toggleMenu = (id: string) => {
      menuOpen.value = menuOpen.value === id ? null : id;
    };

    const editAppointment = (appointment: Appointment) => {
      console.log('Edit Appointment:', appointment);
    };

    const deleteAppointment = (id: string) => {
      store.dispatch('deleteAppointment', id);
    };

    return {
      sortedAppointments,
      toggleMenu,
      editAppointment,
      deleteAppointment,
      menuOpen,
      formatDate
    };
  }
});
</script>



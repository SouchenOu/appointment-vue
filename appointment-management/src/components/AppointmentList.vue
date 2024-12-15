<template>
  <div class="max-w-7xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
    <router-link to="/AddAppointment">
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
          </table>

          <div class="overflow-y-auto max-h-[500px]">
            <table class="min-w-full table-auto border-collapse text-gray-800">
              <tbody>
                <tr v-for="appointment in sortedAppointments" :key="appointment.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 text-sm font-medium text-gray-700">{{ appointment.title }}</td>
                  <td class="px-6 py-4 text-sm font-medium text-gray-700">{{ appointment.date }}</td>
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
                          <button
                            @click="editAppointment(appointment)"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left rounded-md"
                          >
                            Edit
                          </button>
                          <button
                            @click="deleteAppointment(appointment.id)"
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
    const sortedAppointments = computed(() => {
      return appointments.value
        .slice()
        .sort((a: Appointment, b: Appointment) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateA.getTime() - dateB.getTime();
        });
    });

    const toggleMenu = (id: string) => {
      console.log("id-->", id);
      console.log("menueOpen-->", menuOpen.value);
      if (menuOpen.value === id) {
        menuOpen.value = null; 
      } else {
        menuOpen.value = id; 
      }
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
      menuOpen
    };
  }
});
</script>
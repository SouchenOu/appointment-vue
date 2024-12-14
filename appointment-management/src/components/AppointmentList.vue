<template>
  <div class="max-w-7xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
    <router-link to="/AddAppointment">
      <button class="flex items-center justify-center w-[300px] px-5 py-3 bg-blue-600 text-white rounded-lg border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6 transition duration-300">
        <span class="mr-2">+</span> Add New Appointment
      </button>
    </router-link>

    <div>
      <h2 class="text-3xl font-semibold text-center text-gray-800 mb-8">Appointment List</h2>
      <div class="overflow-x-auto max-h-[400px]">
        <table class="min-w-full table-auto border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Title</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Time</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody class="overflow-y-scroll">
            <tr v-for="appointment in sortedAppointments" :key="appointment.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 text-sm font-medium text-gray-700">{{ appointment.title }}</td>
              <td class="px-6 py-4 text-sm font-medium text-gray-700">{{ appointment.date }}</td>
              <td class="px-6 py-4 text-sm font-medium text-gray-700">{{ appointment.time }}</td>
              <td class="px-6 py-4 text-sm font-medium">
                <button
                  @click="deleteAppointment(appointment.id)"
                  class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                >
                  <font-awesome-icon :icon="['fas', 'trash']" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
}

export default defineComponent({
  name: 'AppointmentList',
  setup() {
    const store = useStore();

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

    const deleteAppointment = (id: string) => {
      store.dispatch('deleteAppointment', id);
    };

    return {
      sortedAppointments,
      deleteAppointment
    };
  }
});
</script>
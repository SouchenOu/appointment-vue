<template>
  <div class="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-semibold text-center mb-4">Add Appointment</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
          v-model="appointment.title"
          id="title"
          type="text"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-indigo-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
        <input
          v-model="appointment.date"
          id="date"
          type="date"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="time" class="block text-sm font-medium text-gray-700">Time</label>
        <div class="flex space-x-2">
          <input
            v-model="appointment.hour"
            id="hour"
            type="number"
            min="1"
            max="12"
            placeholder="HH"
            class="mt-1 block w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <span class="text-lg font-medium">:</span>
          <input
            v-model="appointment.minute"
            id="minute"
            type="number"
            min="0"
            max="59"
            placeholder="MM"
            class="mt-1 block w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <select
            v-model="appointment.meridiem"
            id="meridiem"
            class="mt-1 block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Appointment
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AddAppointment',
  setup() {
    const store = useStore();
    const appointment = ref({
      title: '',
      date: '',
      hour: '',
      minute: '',
      meridiem: 'AM',
    });

    const submitForm = async () => {
  
      if (appointment.value.title && appointment.value.date && appointment.value.hour  && appointment.value.meridiem) {
       
        const formattedTime = `${appointment.value.hour}:${appointment.value.minute} ${appointment.value.meridiem}`;
        const newAppointment = {
          title: appointment.value.title,
          date: appointment.value.date,
          time: formattedTime,
        };

        try {
          console.log("Attempting to create appointment:", newAppointment);
          await store.dispatch('createAppointment', newAppointment);
          
          appointment.value = { title: '', date: '', hour: '', minute: '', meridiem: 'AM' };
        } catch (error) {
          console.error("Error creating appointment:", error);
        }
      } else {
        console.log("Please fill in all fields.");
      }
    };

    return {
      appointment,
      submitForm,
    };
  },
});
</script>
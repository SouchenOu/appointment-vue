<template>
  <div class="max-w-2xl mx-auto mt-12 p-8 bg-white shadow-2xl rounded-lg">
    <h2 class="text-4xl font-bold text-center text-gray-800 mb-8">Add Your Appointment</h2>
    <form @submit.prevent="submitForm">
      <div class="grid grid-cols-1 gap-6">
        <div>
          <label for="title" class="block text-lg font-medium text-gray-700">Title</label>
          <input
            v-model="appointment.title"
            id="title"
            type="text"
            class="mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter appointment title"
          />
          <p v-if="errors.title" class="text-red-500 text-sm mt-2">{{ errors.title }}</p>
        </div>

        <div>
          <label for="date" class="block text-lg font-medium text-gray-700">Date</label>
          <input
            v-model="appointment.date"
            id="date"
            type="date"
            class="mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p v-if="errors.date" class="text-red-500 text-sm mt-2">{{ errors.date }}</p>
        </div>

        <div>
          <label for="time" class="block text-lg font-medium text-gray-700">Time</label>
          <div class="flex items-center space-x-4">
            <input
              v-model="appointment.hour"
              id="hour"
              type="number"
              min="1"
              max="12"
              placeholder="HH"
              class="mt-2 w-20 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span class="text-3xl font-semibold">:</span>
            <input
              v-model="appointment.minute"
              id="minute"
              type="number"
              min="0"
              max="59"
              placeholder="MM"
              class="mt-2 w-20 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <select
              v-model="appointment.meridiem"
              id="meridiem"
              class="mt-2 p-4 w-24 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <p v-if="errors.time" class="text-red-500 text-sm mt-2">{{ errors.time }}</p>
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <button
          type="submit"
          class="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Appointment
        </button>
      </div>
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

    const errors = ref({
      title: '',
      date: '',
      time: '',
    });

    const validateForm = () => {
      let isValid = true;
      errors.value = { title: '', date: '', time: '' };

      // Validate Title
      if (!appointment.value.title.trim()) {
        errors.value.title = 'Title is required.';
        isValid = false;
      }

      // Validate Date
      if (!appointment.value.date) {
        errors.value.date = 'Date is required.';
        isValid = false;
      } else if (!/^\d{4}-\d{2}-\d{2}$/.test(appointment.value.date)) {
        errors.value.date = 'Date must be in YYYY-MM-DD format.';
        isValid = false;
      }

      if (!appointment.value.hour  || !appointment.value.meridiem) {
          errors.value.time = 'Complete time is required.';
          isValid = false;
        } else {
          const hour = Number(appointment.value.hour);
          const minute = Number(appointment.value.minute);

          if (
            isNaN(hour) || 
            isNaN(minute) || 
            hour < 1 || 
            hour > 12 || 
            minute < 0 || 
            minute > 59
          ) {
            errors.value.time = 'Invalid time. Ensure hour is 1-12 and minute is 0-59.';
            isValid = false;
          }
        }

      return isValid;
    };

   
    const submitForm = async () => {
      if (!validateForm()) return;

    
      const formattedTime = `${appointment.value.hour}:${appointment.value.minute} ${appointment.value.meridiem}`;
      const newAppointment = {
        title: appointment.value.title,
        date: appointment.value.date,
        time: formattedTime,
      };

      try {
        await store.dispatch('createAppointment', newAppointment);
        appointment.value = { title: '', date: '', hour: '', minute: '', meridiem: 'AM' };
      } catch (error) {
        console.error('Error creating appointment:', error);
      }
    };

    return {
      appointment,
      errors,
      submitForm,
    };
  },
});
</script>
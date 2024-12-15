<template>
    <div class="max-w-2xl mx-auto mt-12 p-8 bg-white shadow-2xl rounded-lg">
      <h2 class="text-4xl font-bold text-center text-gray-800 mb-8">Edit Your Appointment</h2>
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
              required
            />
          </div>
  
          <div>
            <label for="date" class="block text-lg font-medium text-gray-700">Date</label>
            <input
              v-model="appointment.date"
              id="date"
              type="date"
              class="mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
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
                required
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
                required
              />
              <select
                v-model="appointment.meridiem"
                id="meridiem"
                class="mt-2 p-4 w-24 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
  
        <div class="flex justify-center mt-8">
          <button
            type="submit"
            class="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Appointment
          </button>
        </div>
      </form>
    </div>
  </template>
  
 

  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  
  export default defineComponent({
    name: 'EditAppointment',
    setup() {
      const store = useStore();
      const route = useRoute();
      const appointment = ref({
   
        title: '',
        date: '',
        hour: '',
        minute: '',
        meridiem: 'AM',
      });
  
   
      const appointmentId = route.params.id;

      const submitForm = async () => {
        if (appointment.value.title && appointment.value.date && appointment.value.hour  && appointment.value.meridiem) {
          const formattedTime = `${appointment.value.hour}:${appointment.value.minute} ${appointment.value.meridiem}`;
          const updatedAppointment = {
            id: appointmentId, 
            title: appointment.value.title,
            date: appointment.value.date,
            time: formattedTime,
          };
  
          try {
            await store.dispatch('editAppointment', updatedAppointment); 
  
            appointment.value = {title: '', date: '', hour: '', minute: '', meridiem: 'AM' };
          } catch (error) {
            console.error('Error updating appointment:', error);
          }
        } else {
          console.log('Please fill in all fields.');
        }
      };
  
      return {
        appointment,
        submitForm,
      };
    },
  });
  </script>
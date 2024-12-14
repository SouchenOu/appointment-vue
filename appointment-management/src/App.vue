<script setup lang="ts">
import AppointmentList from './components/AppointmentList.vue'
</script>

<template>
  <div>
    <h1 class="text-4xl font-semibold text-center text-gray-800 bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text p-6 shadow-lg rounded-lg">
      Welcome to Appointment Management
    </h1>    
    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

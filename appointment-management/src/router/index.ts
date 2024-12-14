import { createRouter, createWebHistory } from 'vue-router';
import AppointmentList from '../components/AppointmentList.vue';
import AddAppointment from '../components/AddAppointment.vue';

const routes = [
  { path: '/', component: AppointmentList },
  { path: '/AddAppointment', component: AddAppointment }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
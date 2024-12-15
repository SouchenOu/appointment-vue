import { createRouter, createWebHistory } from 'vue-router';
import AppointmentList from '../components/AppointmentList.vue';
import AddAppointment from '../components/AddAppointment.vue';
import EditAppointement from '../components/EditAppointement.vue';
const routes = [
    { path: '/', component: AppointmentList },
    { path: '/add-appointment', component: AddAppointment },
    { path: '/edit-appointment/:id', component: EditAppointement }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;

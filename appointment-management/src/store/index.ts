import { createStore } from 'vuex';
import moment from 'moment';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import { AxiosError } from 'axios';




interface Appointment {
    id: string;
    title: string;
    date: string;
    time: string;
}

interface State {
    appointments: Appointment[];
}

export default createStore<State>({
    state: {
        appointments: []
    },
    mutations: {
        ADD_APPOINTMENT(state, appointment: Appointment) {
            state.appointments.push(appointment);
        },
        EDIT_APPOINTMENT(state, updatedAppointment: Appointment) {
            const index = state.appointments.findIndex(a => a.id === updatedAppointment.id);
            if (index !== -1) {
                state.appointments[index] = updatedAppointment;
            }
        },
        DELETE_APPOINTMENT(state, id: string) {
            state.appointments = state.appointments.filter(a => a.id !== id);
        },
        SET_APPOINTMENTS(state, appointments: Appointment[]) {
            state.appointments = appointments;
        }
    },
    actions: {
        async fetchAppointments({ commit }) {
            const toast = useToast(); 
            try {
              const response = await axios.get("http://localhost:8000/appointments");
              
              if (response.status === 200) {
                const appointments = response.data.appointments;
                commit('SET_APPOINTMENTS', appointments);
              }
            } catch (error) {
              console.error("Error fetching appointments:", error);
              if (error instanceof Error) {
                toast.error(`Error: ${error.message || 'An unknown error occurred'}`);
              } else {
                toast.error('An unknown error occurred');
              }
            }
          },
          async createAppointment({ commit }, appointment: Appointment) {
            const toast = useToast();
            try {
                const result = await axios.post("http://localhost:8000/appointments", appointment);
        
                if (result.status === 200) {
                    const newAppointment = result.data.appointment;
                    commit('ADD_APPOINTMENT', newAppointment);
                    toast.success('Appointment created successfully!');
                }
            } catch (error) {
                console.error("Error creating appointment:", error);
        
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.error || 'An unknown error occurred');
                } else {
                    toast.error('An unknown error occurred');
                }
            }
        },
        async editAppointment({ commit }, updatedAppointment) {
            const toast = useToast();
            try {
              const response = await axios.put(`http://localhost:8000/appointments/${updatedAppointment.id}`, updatedAppointment);
              
              if (response.status === 200) {
                commit('EDIT_APPOINTMENT', updatedAppointment);
                toast.success('Appointment updated successfully!');
              }
            } catch (error) {
              console.error("Error editing appointment:", error);
        
              if (error instanceof AxiosError) {
                toast.error(error.response?.data.error || 'An unknown error occurred');
              } else {
                toast.error('An unknown error occurred');
              }
            }
          },
      
        async deleteAppointment ({ commit, dispatch }, id: string){
            const toast = useToast();

            try {
              const response = await axios.delete(`http://localhost:8000/appointments/${id}`);
              if (response.status === 200) {
                commit('DELETE_APPOINTMENT', id);
                toast.success('Appointment delete successfully!');
                dispatch('fetchAppointments');
            }
            } catch (error) {
              console.error('Error deleting appointment:', error);
              if (error instanceof AxiosError) {
                toast.error(error.response?.data.error || 'An unknown error occurred');
              } else {
                toast.error('An unknown error occurred');
              }
            }
        }
    },
    getters: {
        getAppointments: (state) => state.appointments,
        isTimeSlotAvailable: (state) => (date: string, time: string) =>
            !state.appointments.find(a => a.date === date && a.time === time),
        isLunchBreak: (state) => (time: string) => {
            const lunchStart = moment('12:00 PM', 'hh:mm A');
            const lunchEnd = moment('2:00 PM', 'hh:mm A');
            const timeMoment = moment(time, 'hh:mm A');
            return timeMoment.isBetween(lunchStart, lunchEnd, null, '[)');
        },
        isInAllowedTimeFrame: (state) => (time: string) => {
            const startTime = moment('8:00 AM', 'hh:mm A');
            const endTime = moment('6:00 PM', 'hh:mm A');
            const selectedTime = moment(time, 'hh:mm A');
            return selectedTime.isBetween(startTime, endTime, null, '[)');
        },
        isMinimumTimeFrameMet: (state) => (date: string, time: string) => {
            if (date === moment().format('YYYY-MM-DD')) {
                const currentTime = moment();
                const selectedTime = moment(`${date} ${time}`, 'YYYY-MM-DD hh:mm A');
                return selectedTime.isAfter(currentTime.add(2, 'hours'));
            }
            return true;
        }
    }
});
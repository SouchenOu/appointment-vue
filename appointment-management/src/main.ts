import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './assets/styles/tailwind.css';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; 

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTrash);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(store);
app.use(router);
app.use(Toast, { position: 'top-right', timeout: 3000 }); 

app.mount('#app');
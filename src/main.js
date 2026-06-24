import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import App from './App.vue';
import router from './router';
import store from './store';
import { AppPreset } from './theme/app-preset';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(PrimeVue, {
  theme: {
    preset: AppPreset,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
});
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');

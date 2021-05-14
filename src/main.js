import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import VueToast from 'vue-toast-notification';
import Toaster from "@meforma/vue-toaster";
import 'vue-toast-notification/dist/theme-sugar.css';
import './assets/css/main.css'

const app = createApp(App)
app.use(router)
app.use(Toaster)
app.mount('#app')

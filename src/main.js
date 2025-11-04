import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: { template: '<div>Home</div>' } }
    ]
})

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.mount('#app')

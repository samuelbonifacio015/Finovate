import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Aura from '@primevue/themes/aura';
import App from './App.vue'

const routes = [
    {
        path: '/',
        //component: MainLayout
        children: [
            {
                path: '',
                redirect: '/home'
            },
            {
                path: 'home',
                name: 'Home',
                component: () => import('./components/pages/Home.vue'),
            },
            {
                path: 'user-profile',
                name: 'UserProfile',
                component: () => import('./components/pages/UserProfile.vue'),
            },
            {
                path: 'login',
                name: 'Login',
                component: () => import('./components/pages/Login.vue'),
            }
        ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark-mode',
            cssLayer: false
        }
    }
});
app.mount('#app')

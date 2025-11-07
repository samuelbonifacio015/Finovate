import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
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
app.use(PrimeVue)
app.mount('#app')

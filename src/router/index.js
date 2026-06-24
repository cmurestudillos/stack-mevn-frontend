import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/agregar',
    name: 'agregar',
    component: () => import('../views/Agregar.vue'),
  },
  {
    path: '/editar/:id',
    name: 'editar',
    component: () => import('../views/Editar.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

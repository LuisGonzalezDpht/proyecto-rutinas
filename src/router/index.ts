import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/rutinas',
    name: 'rutinas',
    component: () => import('@/views/RoutineView.vue'),
  },
  {
    path: '/rutinas/crear',
    name: 'crear-rutina',
    component: () => import('@/views/CreateRoutineView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router

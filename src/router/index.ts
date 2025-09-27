import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/homeView.vue'),
  },
  {
    path: '/rutinas',
    name: 'rutinas',
    component: () => import('@/views/RoutineView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router

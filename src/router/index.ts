import auth from '@/middleware/auth'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

type MiddlewareFunction = (context: {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: NavigationGuardNext
}) => void

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/',
    component: () => import('@/layouts/defaultLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { middlewares: [auth] },
      },
      {
        path: '/rutinas',
        name: 'rutinas',
        component: () => import('@/views/RoutineView.vue'),
        meta: { middlewares: [auth] },
      },
      {
        path: '/rutinas/crear',
        name: 'crear-rutina',
        component: () => import('@/views/CreateRoutineView.vue'),
        meta: { middlewares: [auth] },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const middlewares = to.meta.middlewares as MiddlewareFunction[] | undefined
  if (!middlewares) return next()

  // Ejecutar middlewares secuencialmente
  let currentIndex = 0

  const runNextMiddleware = () => {
    if (currentIndex >= middlewares.length) return next()

    const middleware = middlewares[currentIndex++]
    middleware({ to, from, next: runNextMiddleware })
  }

  runNextMiddleware()
})

export default router

import auth from '@/middleware/auth'
import logout from '@/middleware/logout'
import type { MiddlewareContext } from '@/shared/types/middleware'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/logout',
    meta: { middlewares: [logout, auth] }, // el orden es importante
    component: () => import('@/views/LogoutView.vue'),
  },
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
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
  const middlewares = to.meta.middlewares as ((ctx: MiddlewareContext) => void)[] | undefined
  if (!middlewares || middlewares.length === 0) return next()

  let currentIndex = 0

  const runNextMiddleware = () => {
    const middleware = middlewares[currentIndex++]
    if (!middleware) {
      return next()
    }

    middleware({
      to,
      from,
      next,
      nextMiddleware: runNextMiddleware,
    })
  }

  runNextMiddleware()
})

export default router

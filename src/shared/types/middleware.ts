import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export type MiddlewareFunction = (context: {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: NavigationGuardNext
}) => void

export type MiddlewareContext = {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: NavigationGuardNext
  nextMiddleware: () => void
}

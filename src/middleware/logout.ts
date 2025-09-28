import type { MiddlewareContext } from '@/shared/types/middleware'
import { useAuthStore } from '@/stores/authStore'

export default function logout({ next }: MiddlewareContext) {
  const authStore = useAuthStore()

  authStore.isAuthenticated = false
  nextTick()
  next({ name: 'login' })
}

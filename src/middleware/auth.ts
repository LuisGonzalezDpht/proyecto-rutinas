import { useAuthStore } from "@/stores/authStore"
import type { MiddlewareContext } from '@/shared/types/middleware'

export default function auth({ next }: MiddlewareContext) {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) return next({ name: 'login' })
  next()
}

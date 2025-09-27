import { useAuthStore } from '@/stores/authStore'
import type { NavigationGuardNext } from 'vue-router'

export default function auth({ next }: { next: NavigationGuardNext }) {
  const authStore = useAuthStore()
  console.log('Estoy en el guard auth')
  console.log('isAuthenticated', authStore.isAuthenticated)

  if (!authStore.isAuthenticated) return next({ name: 'login' })
  next()
}

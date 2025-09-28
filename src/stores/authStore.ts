export const useAuthStore = defineStore(
  'auth',
  () => {
    const isAuthenticated = ref(false)

    return {
      isAuthenticated,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['isAuthenticated'],
    },
  },
)

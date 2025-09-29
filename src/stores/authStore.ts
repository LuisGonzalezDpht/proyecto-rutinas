export const useAuthStore = defineStore(
  'auth',
  () => {
    const isAuthenticated = ref(false)
    const username = ref(null)

    function login() {
      isAuthenticated.value = true
    }

    return {
      login,
      username,
      isAuthenticated,
    }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['isAuthenticated', 'username'],
    },
  },
)

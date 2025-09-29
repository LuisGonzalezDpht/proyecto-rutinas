export const useAuthStore = defineStore(
  'auth',
  () => {
    const isAuthenticated = ref(false)
    const username = ref<string | null>(null)

    function login() {
      isAuthenticated.value = true

      if (username.value) username.value = username.value.trim()

      location.href = '/home'
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

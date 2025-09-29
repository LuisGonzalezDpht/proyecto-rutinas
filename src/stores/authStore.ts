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

    function getDefaultUsers(): boolean {
      const users = import.meta.env.VITE_DEFAULT_USERS.split(',')
      return users.map((user: string) => user.trim() === username.value).includes(true)
    }

    return {
      getDefaultUsers,
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

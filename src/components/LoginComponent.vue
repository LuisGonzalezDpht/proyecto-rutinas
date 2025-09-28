<template>
  <div
    class="px-2 py-5 max-w-xl w-full bg-neutral-900/50 backdrop-blur-2xl rounded-lg flex flex-col text-center drop-shadow-2xl gap-y-3"
  >
    <h1 class="text-2xl font-bold text-white">Login</h1>
    <p v-if="!authStore.isAuthenticated">actualmente no se puede loguear</p>
    <p v-else>
      <CustomButton to="/home" label="Ir a home" size="small" severity="contrast" />
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const route = useRoute()

onBeforeMount(() => {
  if (route.query.isAuthenticated === 'true') {
    authStore.isAuthenticated = true
  }
})
</script>

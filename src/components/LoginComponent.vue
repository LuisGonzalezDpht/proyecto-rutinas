<template>
  <div
    class="px-2 py-5 max-w-xl w-full bg-neutral-900/50 backdrop-blur-2xl rounded-lg flex flex-col text-center justify-center drop-shadow-2xl gap-y-3"
  >
    <h1 class="text-2xl font-bold text-white">¿Como deberiamos llamarte?</h1>
    <InputText
      v-model="authStore.username"
      name="username"
      placeholder="Nombre de usuario"
      class="max-w-md w-full mx-auto"
    />
    <CustomButton
      :disabled="!authStore.username"
      label="Ingresar"
      class="w-full max-w-md mx-auto"
      @click="authStore.login"
    />
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore'
import CustomButton from './ui/CustomButton.vue'

const authStore = useAuthStore()
const route = useRoute()

onBeforeMount(() => {
  if (route.query.isAuthenticated === 'true') {
    authStore.isAuthenticated = true
  }
})
</script>

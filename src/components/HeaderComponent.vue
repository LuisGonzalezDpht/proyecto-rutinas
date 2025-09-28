<template>
  <navbar
    class="bg-neutral-200 dark:bg-neutral-800 lg:my-3 lg:mx-10 m-2 p-1.5 rounded-lg flex justify-between items-center drop-shadow-lg"
  >
    <ul class="inline-flex !list-none gap-x-1 !mb-0">
      <li v-for="(item, index) in routes" :key="index">
        <CustomButton
          :to="item.to"
          :label="item.label"
          :icon="item.icon ? item.icon : ''"
          :severity="item.severity"
          size="small"
        />
      </li>
    </ul>
    <div v-if="authStore.isAuthenticated">
      <CustomButton to="/logout" label="Logout" size="small" severity="danger" />
    </div>
  </navbar>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const route = useRoute()

const routes = computed(() => [
  {
    to: '/home',
    label: 'Home',
    icon: undefined,
    variant: 'link',
    severity: '/home' === route.path ? 'contrast' : 'secondary',
  },
  {
    to: '/rutinas',
    label: 'Lista rutinas',
    icon: 'pi pi-file',
    variant: 'link',
    severity: '/rutinas' === route.path ? 'contrast' : 'secondary',
  },
  {
    to: '/rutinas/crear',
    label: 'Crear rutina',
    icon: undefined,
    variant: 'link',
    severity: '/rutinas/crear' === route.path ? 'contrast' : 'secondary',
  },
])
</script>

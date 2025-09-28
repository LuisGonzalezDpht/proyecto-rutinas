<template>
  <navbar
    class="bg-neutral-200 dark:bg-neutral-800 md:my-3 md:mx-10 m-2 p-1.5 rounded-lg flex justify-between items-center drop-shadow-lg overflow-auto"
  >
    <ul class="inline-flex !list-none md:gap-x-1 whitespace-nowrap">
      <li v-for="(item, index) in routes" :key="index">
        <CustomButton
          :to="item.to"
          :label="item.label"
          :iconComponent="item.iconComponent"
          :severity="item.severity"
          size="small"
        />
      </li>
    </ul>
    <div v-if="authStore.isAuthenticated">
      <CustomButton
        to="/logout"
        :iconComponent="ArrowLeftStartOnRectangleIcon"
        label="Logout"
        size="small"
        severity="danger"
      />
    </div>
  </navbar>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore'
import {
  ArrowLeftStartOnRectangleIcon,
  DocumentIcon,
  HomeIcon,
  PlusIcon,
} from '@heroicons/vue/24/solid'

const authStore = useAuthStore()

const route = useRoute()

const routes = computed(() => [
  {
    to: '/home',
    label: 'Home',
    iconComponent: HomeIcon,
    variant: 'link',
    severity: '/home' === route.path ? 'contrast' : 'secondary',
  },
  {
    to: '/rutinas',
    label: 'Lista rutinas',
    iconComponent: DocumentIcon,
    variant: 'link',
    severity: '/rutinas' === route.path ? 'contrast' : 'secondary',
  },
  {
    to: '/rutinas/crear',
    label: 'Crear rutina',
    iconComponent: PlusIcon,
    variant: 'link',
    severity: '/rutinas/crear' === route.path ? 'contrast' : 'secondary',
  },
])
</script>

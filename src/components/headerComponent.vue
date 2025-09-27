<template>
  <navbar
    class="bg-neutral-200 dark:bg-neutral-800 lg:my-3 lg:mx-10 m-2 p-1.5 rounded-xl flex justify-between items-center drop-shadow-lg"
  >
    <ul class="inline-flex !list-none gap-x-1 !mb-0">
      <li v-for="(item, index) in routes" :key="index">
        <CustomButton
          :to="item.to"
          :label="item.label"
          :icon="item.icon ? item.icon : ''"
          :severity="item.severity"
        />
      </li>
    </ul>
  </navbar>
</template>

<script lang="ts" setup>
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

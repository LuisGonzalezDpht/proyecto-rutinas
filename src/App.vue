<script setup lang="ts">
import DefaultLayout from './layouts/defaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <Transition>
      <RouterView />
    </Transition>
  </DefaultLayout>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.v-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  filter: blur(2px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(1.02);
  filter: blur(1px);
}

.v-enter-active {
  transition-delay: 0.05s;
}

.v-leave-active {
  transition-duration: 0.3s;
}
</style>

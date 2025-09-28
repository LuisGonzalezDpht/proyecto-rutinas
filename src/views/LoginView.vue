<template>
  <div
    class="w-full min-h-screen flex justify-center items-center transition-colors duration-300"
    :style="{
      background: `radial-gradient(circle at ${x}px ${y}px, #ffcb50, #544f7d)`,
    }"
  >
    <LoginComponent />
  </div>
</template>

<script lang="ts" setup>
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
</script>

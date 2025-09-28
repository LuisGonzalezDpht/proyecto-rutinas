<template>
  <div
    class="max-w-3xl w-full bg-neutral-100 lg:dark:bg-neutral-900 dark:bg-neutral-950 lg:p-10 p-5 lg:rounded-lg drop-shadow-2xl transition-all duration-200 ease-in-out"
  >
    <ul>
      <li v-for="(exercise, index) in workoutOfTheDay" :key="index">{{ exercise.nombre }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useWorkouts } from '@/stores/workoutsStore'

const workoutsStore = useWorkouts()

const workoutOfTheDay = computed(() => workoutsStore.getWorkoutsOfTheDay().grupo)

onBeforeMount(() => {
  workoutsStore.setWorkouts()
})
</script>

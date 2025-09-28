<template>
  <div>
    <template v-if="workoutOfTheDay.length > 0">
      <ul>
        <li v-for="(exercise, index) in workoutOfTheDay" :key="index">{{ exercise.nombre }}</li>
      </ul>
    </template>
    <template v-else>
      <p class="text-center text-gray-500">No hay ejercicios para hoy ({{ day }})</p>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { Grupo } from '@/shared/types/workout'
import { useWorkouts } from '@/stores/workoutsStore'

const workoutsStore = useWorkouts()

const day = ref(workoutsStore.getWorkoutsOfTheDay().day || '')

const workoutOfTheDay = computed(() => {
  if (workoutsStore.notWorkingDay) {
    return [] as Grupo[]
  }

  if (workoutsStore.getWorkoutsOfTheDay() && workoutsStore.getWorkoutsOfTheDay().workout.grupo) {
    return workoutsStore.getWorkoutsOfTheDay().workout.grupo
  }
  return [] as Grupo[]
})

onBeforeMount(async () => {
  await workoutsStore.setWorkouts()
})
</script>

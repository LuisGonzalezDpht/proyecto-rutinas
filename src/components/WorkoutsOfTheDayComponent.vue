<template>
  <div class="w-full">
    <template v-if="workoutOfTheDay.length > 0">
      <h1 class="flex justify-between text-3xl">
        <span>EJERCICIOS DEL DÍA</span> <strong>({{ day }})</strong>
      </h1>
      <ul class="mt-3 space-y-5">
        <li
          v-for="(workout, index) in workoutOfTheDay"
          class="rounded-xl overflow-hidden"
          :key="index"
        >
          <h3 class="px-2 py-1 bg-neutral-200 dark:bg-neutral-800 text-lg">
            {{ workout.nombre }}
          </h3>
          <ul>
            <li
              v-for="(exercise, index) in workout.ejercicios"
              class="px-4 py-1.5 bg-neutral-50 dark:bg-neutral-700"
              :key="index"
            >
              <p>{{ exercise.nombre }}</p>
              <p class="px-5 dark:text-blue-200 text-blue-600">
                {{ returnSeries(exercise) }}
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </template>
    <template v-else>
      <p class="text-center text-gray-500">No hay ejercicios para hoy ({{ day }})</p>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { Ejercicio, Grupo } from '@/shared/types/workout'
import { useWorkouts } from '@/stores/workoutsStore'
import { getToday } from '@/composables/useDateFunctions'

const workoutsStore = useWorkouts()

const day = computed(() => {
  // Forzar reactividad observando doFake y dayName
  void workoutsStore.doFake
  void workoutsStore.dayName

  const workoutDay = workoutsStore.getWorkoutsOfTheDay().day
  return workoutDay || getToday()
})

const workoutOfTheDay = computed(() => {
  // Forzar reactividad observando doFake y dayName
  void workoutsStore.doFake
  void workoutsStore.dayName

  if (workoutsStore.notWorkingDay) {
    return [] as Grupo[]
  }

  const workoutData = workoutsStore.getWorkoutsOfTheDay()
  if (workoutData && workoutData.workout.grupo) {
    return workoutData.workout.grupo
  }
  return [] as Grupo[]
})

function returnSeries(exercise: Ejercicio): string {
  let lastRep = 0
  let repExist = true

  exercise.series.forEach((i) => {
    if (lastRep === i.repeticiones) {
      repExist = false
    }

    lastRep = i.repeticiones
  })

  const series = !repExist
    ? `${exercise.nSeries} x ${exercise.series[0].repeticiones}`
    : exercise.series.map((serie) => `${serie.serie} x ${serie.repeticiones}`).join(', ')

  return `${series}`
}

watch(
  [() => workoutsStore.doFake, () => workoutsStore.dayName],
  async () => {
    // Resetear el estado cuando cambian los valores
    workoutsStore.notWorkingDay = false
    await workoutsStore.setWorkouts()
  },
  { immediate: false },
)

onBeforeMount(async () => {
  await workoutsStore.setWorkouts()
})
</script>

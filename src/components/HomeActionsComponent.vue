<template>
  <div class="w-full flex justify-between">
    <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-200">
      Bienvenido, {{ authStore.username }}
    </h2>
    <div class="flex gap-x-2 items-center">
      <label for="falsear" class="space-x-2">
        <Checkbox v-model="workoutsStore.doFake" name="falsear" binary /> Ver Otros Días
      </label>
      <div v-if="workoutsStore.doFake">
        <Select v-model="seleccionado" :options="dias" name="falsearDay" binary placeholder="Día" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DAYS_WITH_ACTUAL } from '@/shared/types/days'
import { useAuthStore } from '@/stores/authStore'
import { useWorkouts } from '@/stores/workoutsStore'
import Select from 'primevue/select'

const authStore = useAuthStore()

const dias = ref<DAYS_WITH_ACTUAL[]>([
  'ACTUAL',
  'LUNES',
  'MARTES',
  'MIERCOLES',
  'JUEVES',
  'VIERNES',
  'SABADO',
  'DOMINGO',
])

const seleccionado = ref<DAYS_WITH_ACTUAL>('LUNES')

const workoutsStore = useWorkouts()

watch(seleccionado, (newDay) => {
  if (newDay === 'ACTUAL') {
    workoutsStore.doFake = false
  } else {
    workoutsStore.dayName = newDay
  }
})
</script>

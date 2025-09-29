<template>
  <div class="w-full flex justify-between">
    <div></div>
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
import { useWorkouts } from '@/stores/workoutsStore'
import Select from 'primevue/select'

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

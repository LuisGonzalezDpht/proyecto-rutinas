<template>
  <div class="w-full flex justify-between">
    <div></div>
    <div class="flex gap-x-2 items-center">
      <label for="falsear" class="space-x-2">
        <Checkbox v-model="workoutsStore.doFake" name="falsear" binary /> Ver Otros Días
      </label>
      <div v-if="workoutsStore.doFake">
        <Select
          v-model="workoutsStore.dayName"
          :options="dias"
          name="falsearDay"
          binary
          placeholder="Día"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DAYS } from '@/shared/types/days'
import { useWorkouts } from '@/stores/workoutsStore'
import Select from 'primevue/select'

const dias = ref<DAYS[]>(['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'])

const workoutsStore = useWorkouts()
</script>

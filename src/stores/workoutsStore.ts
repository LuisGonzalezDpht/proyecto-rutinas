import { isWorkoutToday } from '@/composables/useDateFunctions'
import type { DAYS } from '@/shared/types/days'
import type Workout from '@/shared/types/workout'

export const useWorkouts = defineStore('workouts', () => {
  const workouts = ref<Workout[]>([])
  const notWorkingDay = ref(false)
  const isLoading = ref(false)

  const doFake = ref(false)
  const dayName = ref<DAYS>('LUNES')

  async function setWorkouts() {
    try {
      isLoading.value = true
      const routines = await import('@/assets/routines/routines.json')

      if (routines.default && routines.default.length > 0) {
        workouts.value = routines.default
      }
      isLoading.value = false
    } catch (error) {
      console.error('Error loading workouts:', error)
      isLoading.value = false
    }
  }

  function getWorkoutsOfTheDay(): { workout: Workout; day: string } {
    if (workouts.value.length === 0) {
      return { workout: {} as Workout, day: '' }
    }

    const workout = workouts.value.filter(
      (workout) => isWorkoutToday(workout, doFake.value, dayName.value).is,
    )[0]
    if (!workout) {
      notWorkingDay.value = true
      return { workout: {} as Workout, day: '' }
    }
    return { workout, day: isWorkoutToday(workout).day }
  }

  return {
    workouts,
    setWorkouts,
    isLoading,
    getWorkoutsOfTheDay,
    notWorkingDay,
    doFake,
    dayName,
  }
})

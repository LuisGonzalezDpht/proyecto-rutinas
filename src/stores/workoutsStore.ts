import { isWorkoutToday } from '@/composables/useDateFunctions'
import type Workout from '@/shared/types/workout'

export const useWorkouts = defineStore('workouts', () => {
  const workouts = ref<Workout[]>([])
  const isLoading = ref(false)

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

  function getWorkoutsOfTheDay(): Workout {
    return workouts.value.filter((workout) => isWorkoutToday(workout))[0]
  }

  return { workouts, setWorkouts, isLoading, getWorkoutsOfTheDay }
})

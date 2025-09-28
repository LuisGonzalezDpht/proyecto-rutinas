import { isWorkoutToday } from '@/composables/useDateFunctions'
import type Workout from '@/shared/types/workout'

export const useWorkouts = defineStore('workouts', () => {
  const workouts = ref<Workout[]>([])
  const notWorkingDay = ref(false)
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

  function getWorkoutsOfTheDay(): { workout: Workout; day: string } {
    const workout = workouts.value.filter((workout) => isWorkoutToday(workout).is)[0]
    if (!workout) {
      notWorkingDay.value = true
    }
    return { workout, day: isWorkoutToday(workout).day }
  }

  return { workouts, setWorkouts, isLoading, getWorkoutsOfTheDay, notWorkingDay }
})

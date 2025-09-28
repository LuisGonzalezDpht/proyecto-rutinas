import type Workout from '@/shared/types/workout'

export function getToday(): string {
  return new Date().toLocaleDateString('es-ES', { weekday: 'long' })
}

export function getDayByName(string: string) {
  const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
  return days.indexOf(string.toLowerCase()) + 2
}

export function compareToday(day: number) {
  const today = new Date().getDay()
  return day === today
}

export function isWorkoutToday(workout: Workout): { is: boolean; day: string } {
  const day = getDayByName(workout.dia)
  return { is: compareToday(day), day: workout.dia }
}

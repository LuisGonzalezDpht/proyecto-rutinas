import type Workout from '@/shared/types/workout'

export function getToday(): string {
  return new Date().toLocaleDateString('es-ES', { weekday: 'long' })
}

export function getDayByName(string: string) {
  const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
  return days.indexOf(string.toLowerCase()) + 1
}

export function compareToday(day: number) {
  const today = new Date().getDay()
  return day === today
}

export function isWorkoutToday(workout: Workout) {
  const day = getDayByName(workout.dia)
  return compareToday(day)
}

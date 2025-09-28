import type { DAYS } from '@/shared/types/days'
import type Workout from '@/shared/types/workout'

export function getToday(): string {
  return new Date().toLocaleDateString('es-ES', { weekday: 'long' })
}

export function getDayByName(string: string): number {
  const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
  return days.indexOf(string.toLowerCase()) + 1
}

export function compareToday(day: number): boolean {
  const today = new Date().getDay()
  return day === today
}

export function isWorkoutToday(
  workout: Workout,
  doFake: boolean = false,
  dayName: DAYS = 'LUNES',
): { is: boolean; day: string } {
  if (!workout || !workout.dia) {
    return { is: false, day: '' }
  }

  const day = getDayByName(workout.dia)
  return { is: !doFake ? compareToday(day) : day === getDayByName(dayName), day: workout.dia }
}

export default interface Workout {
  dia: string
  grupo: Grupo[]
}

interface Grupo {
  nombre: string
  ejercicios: Ejercicio[]
}

interface Ejercicio {
  nombre: string
  nSeries: number // cantidad total de series
  series: Series[] // pueden ser 2 series de 10 rep o 1 serie de 8 y otra de 10
}

interface Series {
  serie: number
  repeticiones: number
}

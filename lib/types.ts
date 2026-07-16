export interface Player {
  num: number
  licencia: string
  nombre: string
  apellidos: string
  fullName: string
  puntos: number
  edad: number
}

export interface TeamData {
  equipo: string
  liga: string
  categoria: string
  capitan: string
  jugadores: Player[]
}

export interface Pair {
  id: string
  playerA: Player | null
  playerB: Player | null
}

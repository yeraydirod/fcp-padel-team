import type { Player } from './types'

export function getInitials(player: Player): string {
  const first = player.nombre.trim().charAt(0)
  const last = player.apellidos.trim().charAt(0)
  return `${first}${last}`.toUpperCase()
}

/** Deterministic accent color per player so avatars stay consistent. */
const AVATAR_COLORS = [
  'oklch(0.86 0.21 130)', // lime
  'oklch(0.62 0.17 235)', // court blue
  'oklch(0.78 0.15 90)', // amber
  'oklch(0.7 0.14 300)', // violet
  'oklch(0.7 0.17 25)', // coral
  'oklch(0.72 0.15 180)', // teal
]

export function getAvatarColor(player: Player): string {
  const seed = player.licencia
    .split('')
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return AVATAR_COLORS[seed % AVATAR_COLORS.length]
}

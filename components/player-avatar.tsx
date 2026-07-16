import type { Player } from '@/lib/types'
import { getAvatarColor, getInitials } from '@/lib/player-utils'
import { cn } from '@/lib/utils'

interface PlayerAvatarProps {
  player: Player
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'size-9 text-xs',
  md: 'size-12 text-sm',
  lg: 'size-14 text-base',
}

export function PlayerAvatar({ player, size = 'md', className }: PlayerAvatarProps) {
  const color = getAvatarColor(player)
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full font-mono font-bold tracking-tight text-background',
        sizeMap[size],
        className,
      )}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {getInitials(player)}
    </div>
  )
}

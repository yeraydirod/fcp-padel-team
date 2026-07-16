import type { Player } from '@/lib/types'
import { formatPoints } from '@/lib/use-team'
import { PlayerAvatar } from './player-avatar'
import { Card } from '@/components/ui/card'

interface PlayerCardProps {
  player: Player
  rank?: number
}

export function PlayerCard({ player, rank }: PlayerCardProps) {
  return (
    <Card className="group relative flex items-center gap-3 overflow-hidden border-border/60 bg-card p-3.5 transition-colors hover:border-primary/50 sm:p-4">
      <div className="absolute inset-y-0 left-0 w-1 bg-primary/70" />

      {rank !== undefined && (
        <span className="w-6 shrink-0 text-center font-mono text-xs font-medium text-muted-foreground">
          #{rank}
        </span>
      )}

      <PlayerAvatar player={player} size="md" />

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold leading-tight text-card-foreground">
          {player.nombre}{' '}
          <span className="font-medium text-muted-foreground">{player.apellidos}</span>
        </p>
        <p className="mt-0.5 font-mono text-xs font-medium tracking-wide text-foreground/80">
          Lic. {player.licencia}
          <span className="mx-1.5 text-muted-foreground/50">·</span>
          <span className="font-sans font-normal text-muted-foreground">{player.edad} a.</span>
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="font-mono text-xl font-bold leading-none text-primary sm:text-2xl">
          {formatPoints(player.puntos)}
        </p>
        <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
          Puntos
        </p>
      </div>
    </Card>
  )
}

'use client'

import { useMemo, useState } from 'react'
import { X, Trophy, RotateCcw, Shuffle, Users } from 'lucide-react'
import type { Player } from '@/lib/types'
import { formatPoints } from '@/lib/use-team'
import { PlayerAvatar } from './player-avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const PAIR_COUNT = 5

interface SlotRef {
  pair: number
  slot: 0 | 1
}

type Slots = (Player | null)[][]

function emptySlots(): Slots {
  return Array.from({ length: PAIR_COUNT }, () => [null, null])
}

interface PairSimulatorProps {
  players: Player[]
}

export function PairSimulator({ players }: PairSimulatorProps) {
  const [slots, setSlots] = useState<Slots>(emptySlots)

  const usedLicencias = useMemo(() => {
    const set = new Set<string>()
    slots.forEach((pair) =>
      pair.forEach((p) => {
        if (p) set.add(p.licencia)
      }),
    )
    return set
  }, [slots])

  const available = players.filter((p) => !usedLicencias.has(p.licencia))
  const filledCount = usedLicencias.size
  const isComplete = filledCount === PAIR_COUNT * 2
  const freeSlot = nextFreeSlot(slots)

  function assignPlayer(player: Player) {
    const target = nextFreeSlot(slots)
    if (!target) return
    setSlots((prev) => {
      const copy = prev.map((pair) => [...pair])
      copy[target.pair][target.slot] = player
      return copy
    })
  }

  function removePlayer(pair: number, slot: 0 | 1) {
    setSlots((prev) => {
      const copy = prev.map((p) => [...p])
      copy[pair][slot] = null
      return copy
    })
  }

  function reset() {
    setSlots(emptySlots())
  }

  function autoFill() {
    setSlots((prev) => {
      const copy = prev.map((p) => [...p])
      const pool = players.filter(
        (p) => !copy.some((pair) => pair.some((s) => s?.licencia === p.licencia)),
      )
      let idx = 0
      for (let pair = 0; pair < PAIR_COUNT; pair++) {
        for (let slot = 0; slot < 2; slot++) {
          if (!copy[pair][slot] && idx < pool.length) {
            copy[pair][slot] = pool[idx++]
          }
        }
      }
      return copy
    })
  }

  function shuffle() {
    const shuffled = [...players].sort(() => Math.random() - 0.5).slice(0, PAIR_COUNT * 2)
    const next = emptySlots()
    shuffled.forEach((player, i) => {
      next[Math.floor(i / 2)][i % 2] = player
    })
    setSlots(next)
  }

  const ranked = useMemo(() => {
    return slots
      .map((pair, index) => ({
        index,
        players: pair,
        complete: pair[0] !== null && pair[1] !== null,
        total: (pair[0]?.puntos ?? 0) + (pair[1]?.puntos ?? 0),
      }))
      .filter((p) => p.complete)
      .sort((a, b) => b.total - a.total)
  }, [slots])

  const pairRows = isComplete
    ? ranked
    : slots.map((pair, index) => ({
        index,
        players: pair,
        complete: pair[0] !== null && pair[1] !== null,
        total: (pair[0]?.puntos ?? 0) + (pair[1]?.puntos ?? 0),
      }))

  const canShuffle = players.length >= PAIR_COUNT * 2
  const nextPlaza = freeSlot ? freeSlot.pair + 1 : null

  return (
    <div className="flex flex-col gap-5">
      {/* Controls + progress */}
      <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-semibold text-card-foreground">
              {filledCount} / {PAIR_COUNT * 2} asignados
            </p>
            <p className="text-sm text-muted-foreground">
              {isComplete
                ? 'Plantilla lista. Ranking por puntos.'
                : 'Elige jugadores para formar 5 parejas.'}
            </p>
          </div>
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Users className="size-5" />
          </div>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${(filledCount / (PAIR_COUNT * 2)) * 100}%` }}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={shuffle} disabled={!canShuffle}>
            <Shuffle className="size-4" />
            Aleatorio
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={autoFill}
            disabled={isComplete || available.length === 0}
          >
            <Users className="size-4" />
            Autocompletar
          </Button>
          <Button variant="outline" size="sm" onClick={reset} disabled={filledCount === 0}>
            <RotateCcw className="size-4" />
            Reiniciar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        {/* Available players — first on mobile, left on desktop */}
        <section className="flex flex-col gap-3 lg:order-1">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Disponibles ({available.length})
          </h3>
          {available.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border/70 py-8 text-center text-sm text-muted-foreground">
              Todos los jugadores están asignados.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {available.map((player) => (
                <button
                  key={player.licencia}
                  type="button"
                  onClick={() => assignPlayer(player)}
                  disabled={!freeSlot}
                  className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-border/60 bg-card px-3 py-2.5 text-left transition-colors hover:border-primary/60 hover:bg-secondary/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <PlayerAvatar player={player} size="sm" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-card-foreground">
                        {player.fullName}
                      </span>
                      <span className="block font-mono text-xs font-medium text-foreground/75">
                        Lic. {player.licencia}
                      </span>
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-base font-bold text-primary">
                    {formatPoints(player.puntos)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Pair track — second on mobile, right on desktop */}
        <section className="flex flex-col gap-3 lg:order-2">
          <h3 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Trophy className="size-3.5 text-primary" />
            {isComplete ? 'Ranking de parejas' : 'Parejas'}
          </h3>

          {filledCount === 0 && (
            <p className="rounded-lg border border-primary/25 bg-primary/5 px-3 py-2 text-sm text-muted-foreground">
              Toca un jugador para llenar la plaza {nextPlaza ?? 1}.
            </p>
          )}

          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
            {pairRows.map((pair, position) => (
              <PairLane
                key={pair.index}
                players={pair.players}
                total={pair.total}
                position={isComplete ? position + 1 : undefined}
                pairNumber={pair.index + 1}
                isActive={!isComplete && nextPlaza === pair.index + 1}
                isLast={position === pairRows.length - 1}
                onRemove={(slot) => removePlayer(pair.index, slot)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function nextFreeSlot(slots: Slots): SlotRef | null {
  for (let pair = 0; pair < PAIR_COUNT; pair++) {
    for (let slot = 0 as 0 | 1; slot < 2; slot++) {
      if (!slots[pair][slot]) return { pair, slot: slot as 0 | 1 }
    }
  }
  return null
}

interface PairLaneProps {
  players: (Player | null)[]
  total: number
  position?: number
  pairNumber: number
  isActive: boolean
  isLast: boolean
  onRemove: (slot: 0 | 1) => void
}

function PairLane({
  players,
  total,
  position,
  pairNumber,
  isActive,
  isLast,
  onRemove,
}: PairLaneProps) {
  const medal =
    position === 1
      ? 'bg-primary text-primary-foreground'
      : position === 2
        ? 'bg-accent text-accent-foreground'
        : position === 3
          ? 'bg-chart-3 text-background'
          : 'bg-secondary text-secondary-foreground'

  return (
    <div
      className={cn(
        'flex flex-col gap-3 px-3 py-3 transition-colors sm:px-4',
        !isLast && 'border-b border-border/50',
        isActive && 'bg-primary/5',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold',
            position ? medal : isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
          )}
        >
          {position ?? pairNumber}
        </div>
        <div className="text-right">
          <p
            className={cn(
              'font-mono font-bold leading-none text-primary',
              position ? 'text-2xl' : 'text-xl',
            )}
          >
            {formatPoints(total)}
          </p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            Pts pareja
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {[0, 1].map((slot) => {
          const player = players[slot]
          return player ? (
            <div
              key={slot}
              className="flex min-h-16 items-center gap-3 rounded-xl bg-secondary/50 px-3 py-2.5"
            >
              <PlayerAvatar player={player} size="md" />
              <div className="min-w-0 flex-1 select-text">
                <p className="truncate text-base font-semibold leading-snug text-card-foreground">
                  {player.fullName}
                </p>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <p className="font-mono text-sm font-medium text-foreground/90">
                    Lic. {player.licencia}
                  </p>
                  <p className="font-mono text-base font-bold text-primary">
                    {formatPoints(player.puntos)} pts
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemove(slot as 0 | 1)}
                className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
                aria-label={`Quitar a ${player.fullName}`}
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <div
              key={slot}
              className={cn(
                'flex min-h-16 items-center justify-center rounded-xl border border-dashed px-3 text-sm',
                isActive
                  ? 'border-primary/40 bg-primary/5 text-primary/80'
                  : 'border-border/60 text-muted-foreground/70',
              )}
            >
              Libre
            </div>
          )
        })}
      </div>
    </div>
  )
}

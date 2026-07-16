'use client'

import { useMemo, useState } from 'react'
import { Search, ArrowDownWideNarrow } from 'lucide-react'
import type { Player } from '@/lib/types'
import { PlayerCard } from './player-card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SortKey = 'puntos' | 'edad' | 'nombre'

const SORT_LABELS: Record<SortKey, string> = {
  puntos: 'Más puntos primero',
  edad: 'Menor edad primero',
  nombre: 'Nombre (A-Z)',
}

interface RosterSectionProps {
  players: Player[]
}

export function RosterSection({ players }: RosterSectionProps) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('puntos')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = players.filter((p) => p.fullName.toLowerCase().includes(q))
    return [...list].sort((a, b) => {
      if (sort === 'nombre') return a.fullName.localeCompare(b.fullName, 'es')
      if (sort === 'edad') return a.edad - b.edad
      return b.puntos - a.puntos
    })
  }, [players, query, sort])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar jugador..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            aria-label="Buscar jugador por nombre"
          />
        </div>

        <div className="flex items-center gap-2">
          <ArrowDownWideNarrow className="size-4 text-muted-foreground" />
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="w-[190px]" aria-label="Ordenar jugadores">
              <SelectValue>{(value: SortKey) => SORT_LABELS[value]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="puntos">Más puntos primero</SelectItem>
              <SelectItem value="edad">Menor edad primero</SelectItem>
              <SelectItem value="nombre">Nombre (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          No hay jugadores que coincidan con {'"'}
          {query}
          {'"'}.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {filtered.map((player, i) => (
            <PlayerCard key={player.licencia} player={player} rank={sort === 'puntos' ? i + 1 : undefined} />
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

import useSWR from 'swr'
import { getFirebaseAuth } from './firebase'
import { useAuth } from './auth-context'
import { useUserProfile } from './use-user-profile'
import type { TeamData } from './types'

const fetcher = async ([url]: [string]): Promise<TeamData> => {
  const user = getFirebaseAuth().currentUser
  if (!user) throw new Error('No hay sesión activa.')

  const idToken = await user.getIdToken()
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })

  if (!res.ok) {
    const payload = (await res.json().catch(() => ({}))) as {
      error?: string
      details?: string
    }
    const message = payload.details
      ? `${payload.error ?? 'Error al cargar el equipo'} (${payload.details})`
      : payload.error || 'No se pudieron cargar los datos del equipo.'
    throw new Error(message)
  }

  return res.json()
}

export function useTeam() {
  const { user } = useAuth()
  const { profile, hasTeam } = useUserProfile()
  const teamUrl = profile?.teamUrl
  const enabled = Boolean(user && hasTeam && teamUrl)

  const { data, error, isLoading } = useSWR<TeamData>(
    enabled ? ['/api/team', teamUrl] : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  )

  return {
    team: data,
    players: data?.jugadores ?? [],
    isLoading,
    error: error as Error | undefined,
  }
}

export function formatPoints(points: number): string {
  return new Intl.NumberFormat('es-ES').format(points)
}

'use client'

import { useCallback } from 'react'
import useSWR from 'swr'
import { useAuth } from './auth-context'
import { getUserProfile, setTeamUrl, type UserProfile } from './user-profile'

const fetcher = async ([_, uid]: [string, string]): Promise<UserProfile | null> => {
  return getUserProfile(uid)
}

export function useUserProfile() {
  const { user } = useAuth()
  const uid = user?.uid

  const { data, error, isLoading, mutate } = useSWR<UserProfile | null>(
    uid ? ['user-profile', uid] : null,
    fetcher,
    { revalidateOnFocus: false },
  )

  const saveTeamUrl = useCallback(
    async (url: string) => {
      if (!uid || !user?.email) throw new Error('No hay sesión activa')
      await setTeamUrl(uid, user.email, url)
      await mutate({ ...(data ?? { uid, email: user.email }), teamUrl: url }, false)
      await mutate()
    },
    [uid, user?.email, data, mutate],
  )

  return {
    profile: data,
    isLoading,
    error: error as Error | undefined,
    saveTeamUrl,
    hasTeam: Boolean(data?.teamUrl),
  }
}

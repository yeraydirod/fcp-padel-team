import { NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { scrapeTeam } from '@/lib/scrape'
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin'
import type { TeamData } from '@/lib/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

type CachedTeam = TeamData & { scrapedAt?: string }

function jsonError(error: string, status: number, details?: string) {
  return NextResponse.json({ error, details }, { status })
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return jsonError('Falta el token de autenticación.', 401)
    }

    const idToken = authHeader.slice('Bearer '.length).trim()
    if (!idToken) {
      return jsonError('Falta el token de autenticación.', 401)
    }

    let decoded
    try {
      decoded = await getAdminAuth().verifyIdToken(idToken)
    } catch (error) {
      console.error('[api/team] verifyIdToken:', error instanceof Error ? error.message : error)
      return jsonError('Sesión inválida o expirada.', 401)
    }

    const profileRef = getAdminDb().collection('users').doc(decoded.uid)
    const profileSnap = await profileRef.get()
    const profile = profileSnap.data()
    const teamUrl = profile?.teamUrl as string | undefined
    const cachedUrl = profile?.teamCacheUrl as string | undefined
    const cached = profile?.teamCache as CachedTeam | undefined
    const cacheMatches = Boolean(cachedUrl && cachedUrl === teamUrl && cached?.jugadores?.length)

    if (!teamUrl) {
      return jsonError('Aún no has vinculado el link de tu equipo.', 400)
    }

    try {
      const data = await scrapeTeam(teamUrl)
      const scrapedAt = new Date().toISOString()

      await profileRef.set(
        {
          teamCache: { ...data, scrapedAt },
          teamCacheUrl: teamUrl,
          teamCacheUpdatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      )

      return NextResponse.json({ ...data, scrapedAt, stale: false })
    } catch (scrapeError) {
      const details =
        scrapeError instanceof Error ? scrapeError.message : 'Error desconocido al scrapear'

      console.error('[api/team] scrape error:', details)

      if (cacheMatches && cached) {
        const { scrapedAt, ...team } = cached
        return NextResponse.json({
          ...team,
          scrapedAt: scrapedAt ?? null,
          stale: true,
          warning: details,
        })
      }

      return jsonError(
        'No se pudieron obtener los datos de la federación.',
        502,
        details,
      )
    }
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error)
    console.error('[api/team] fatal:', details)
    return jsonError('Error interno al cargar el equipo.', 500, details)
  }
}

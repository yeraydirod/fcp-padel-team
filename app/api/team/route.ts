import { NextResponse } from 'next/server'
import { scrapeTeam } from '@/lib/scrape'
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Falta el token de autenticación.' }, { status: 401 })
    }

    const idToken = authHeader.split('Bearer ')[1]
    let decoded
    try {
      decoded = await getAdminAuth().verifyIdToken(idToken)
    } catch {
      return NextResponse.json({ error: 'Sesión inválida o expirada.' }, { status: 401 })
    }

    const profileRef = getAdminDb().collection('users').doc(decoded.uid)
    const profileSnap = await profileRef.get()
    const teamUrl = profileSnap.data()?.teamUrl as string | undefined

    if (!teamUrl) {
      return NextResponse.json(
        { error: 'Aún no has vinculado el link de tu equipo.' },
        { status: 400 },
      )
    }

    const data = await scrapeTeam(teamUrl)
    return NextResponse.json(data)
  } catch (error) {
    console.log('[api/team] scrape error:', error instanceof Error ? error.message : error)
    return NextResponse.json(
      { error: 'No se pudieron obtener los datos de la federación.' },
      { status: 502 },
    )
  }
}

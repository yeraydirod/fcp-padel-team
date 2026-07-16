import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app'
import { getAuth, type Auth } from 'firebase-admin/auth'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'

let adminAuth: Auth | null = null
let adminDb: Firestore | null = null

function normalizePrivateKey(raw: string): string {
  let key = raw.trim()
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1)
  }
  return key.replace(/\\n/g, '\n')
}

function getAdminApp() {
  if (getApps().length > 0) {
    return getApp()
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID?.trim()
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim()
  const privateKeyRaw = process.env.FIREBASE_ADMIN_PRIVATE_KEY
  const privateKey = privateKeyRaw ? normalizePrivateKey(privateKeyRaw) : undefined

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Faltan credenciales de Firebase Admin en las variables de entorno.')
  }

  if (!privateKey.includes('BEGIN PRIVATE KEY')) {
    throw new Error('FIREBASE_ADMIN_PRIVATE_KEY no tiene un formato PEM válido.')
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

export function getAdminAuth(): Auth {
  if (!adminAuth) {
    adminAuth = getAuth(getAdminApp())
  }
  return adminAuth
}

export function getAdminDb(): Firestore {
  if (!adminDb) {
    adminDb = getFirestore(getAdminApp())
  }
  return adminDb
}

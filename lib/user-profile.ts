import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { getFirebaseDb } from './firebase'

export interface UserProfile {
  uid: string
  email: string
  teamUrl?: string
  createdAt?: Date
  updatedAt?: Date
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const db = getFirebaseDb()
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { uid, ...snap.data() } as UserProfile
}

export async function setTeamUrl(uid: string, email: string, teamUrl: string): Promise<void> {
  const db = getFirebaseDb()
  const ref = doc(db, 'users', uid)
  await setDoc(
    ref,
    {
      uid,
      email,
      teamUrl,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  )
}

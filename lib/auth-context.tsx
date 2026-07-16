'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  setPersistence,
  browserLocalPersistence,
  type User,
  type AuthError,
} from 'firebase/auth'
import { getFirebaseAuth } from './firebase'
import { getRedirectResultOnce } from './auth-redirect'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  authError: string | null
  clearAuthError: () => void
  signInWithGoogle: () => Promise<void>
  signOutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function formatAuthError(err: unknown): string {
  const code = err && typeof err === 'object' && 'code' in err ? String((err as AuthError).code) : ''
  const message = err instanceof Error ? err.message : 'Error de autenticación desconocido'

  switch (code) {
    case 'auth/unauthorized-domain':
      return `Este dominio no está autorizado en Firebase: ${window.location.host}. Añádelo en Authentication → Settings → Authorized domains.`
    case 'auth/operation-not-allowed':
      return 'El proveedor Google no está habilitado en Firebase Authentication.'
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Inicio de sesión cancelado. Inténtalo de nuevo.'
    case 'auth/popup-blocked':
      return 'El navegador bloqueó la ventana emergente. Permite popups para localhost o inténtalo de nuevo.'
    case 'auth/account-exists-with-different-credential':
      return 'Ya existe una cuenta con ese email usando otro método de acceso.'
    default:
      return code ? `${message} (${code})` : message
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const auth = getFirebaseAuth()
    let unsubscribe: (() => void) | undefined

    async function initAuth() {
      if (process.env.NODE_ENV === 'development') {
        console.info('[auth] Inicializando en', window.location.origin)
      }

      try {
        await setPersistence(auth, browserLocalPersistence)

        const result = await getRedirectResultOnce(auth)
        if (result?.user) {
          console.info('[auth] Login completado vía redirect:', result.user.email)
        }
      } catch (err) {
        const msg = formatAuthError(err)
        console.error('[auth] getRedirectResult falló:', err)
        setAuthError(msg)
      } finally {
        unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (process.env.NODE_ENV === 'development') {
            console.info('[auth] onAuthStateChanged:', currentUser?.email ?? 'sin sesión')
          }
          setUser(currentUser)
          setIsLoading(false)
        })
      }
    }

    initAuth()
    return () => unsubscribe?.()
  }, [])

  const clearAuthError = useCallback(() => setAuthError(null), [])

  const signInWithGoogle = useCallback(async () => {
    setAuthError(null)
    const auth = getFirebaseAuth()
    const provider = new GoogleAuthProvider()

    if (process.env.NODE_ENV === 'development') {
      console.info('[auth] Iniciando login con Google (popup) desde', window.location.origin)
    }

    try {
      const result = await signInWithPopup(auth, provider)
      console.info('[auth] Login completado vía popup:', result.user.email)
    } catch (err) {
      const code = err && typeof err === 'object' && 'code' in err ? String((err as AuthError).code) : ''

      // Si el popup falla, intentar redirect como respaldo
      if (code === 'auth/popup-blocked' || code === 'auth/popup-closed-by-user') {
        console.info('[auth] Popup no disponible, usando redirect...')
        await signInWithRedirect(auth, provider)
        return
      }

      throw err
    }
  }, [])

  const signOutUser = useCallback(async () => {
    const auth = getFirebaseAuth()
    await signOut(auth)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoading, authError, clearAuthError, signInWithGoogle, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within <AuthProvider>')
  }
  return context
}

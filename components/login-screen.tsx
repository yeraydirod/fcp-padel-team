'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { CourtGridBackground } from '@/components/court-grid-background'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export function LoginScreen() {
  const { signInWithGoogle, authError, clearAuthError } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mostrar errores del redirect que vienen del AuthProvider
  useEffect(() => {
    if (authError) {
      setError(authError)
      clearAuthError()
    }
  }, [authError, clearAuthError])

  async function handleSignIn() {
    setError(null)
    setIsLoading(true)
    try {
      await signInWithGoogle()
      // Con redirect, la página navegará a Google; no reseteamos isLoading aquí
    } catch (err) {
      const code = err && typeof err === 'object' && 'code' in err ? String(err.code) : ''
      const message = err instanceof Error ? err.message : 'No se pudo iniciar sesión'
      console.error('[login] Error:', code, message, err)
      setError(
        code === 'auth/unauthorized-domain'
          ? `Este dominio no está autorizado en Firebase: ${window.location.host}. Añádelo en Authentication → Settings → Authorized domains.`
          : code
            ? `${message} (${code})`
            : 'No se pudo iniciar sesión. Inténtalo de nuevo.',
      )
      setIsLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <CourtGridBackground />

      <div className="screen-enter relative z-10 w-full max-w-md text-center">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="flex size-2.5 rounded-full bg-primary" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Federación Canaria de Pádel
          </span>
        </div>

        <h1 className="text-balance text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl">
          Pádel <span className="text-primary">Team</span>
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-pretty text-muted-foreground">
          Tu equipo, tu jornada. Organiza la plantilla de parejas con los datos oficiales de la federación.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Button
            size="lg"
            onClick={handleSignIn}
            disabled={isLoading}
            className="h-12 w-full gap-2 rounded-lg px-6 text-base font-semibold transition-transform active:scale-[0.98]"
          >
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : <GoogleIcon />}
            {isLoading ? 'Conectando...' : 'Continuar con Google'}
          </Button>

          {error && (
            <p className="max-w-sm text-center text-sm text-destructive">{error}</p>
          )}

          {process.env.NODE_ENV === 'development' && (
            <p className="mt-2 font-mono text-[10px] text-muted-foreground/70">
              dev · origen: {typeof window !== 'undefined' ? window.location.origin : '—'}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

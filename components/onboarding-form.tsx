'use client'

import { useState } from 'react'
import { useUserProfile } from '@/lib/use-user-profile'
import { CourtGridBackground } from '@/components/court-grid-background'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Link2, AlertTriangle } from 'lucide-react'

const URL_REGEX = /^https?:\/\/.+/i

interface OnboardingFormProps {
  onSaved?: () => void
}

export function OnboardingForm({ onSaved }: OnboardingFormProps) {
  const { saveTeamUrl } = useUserProfile()
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!URL_REGEX.test(url.trim())) {
      setError('Introduce una URL válida que empiece por http:// o https://')
      return
    }

    setIsLoading(true)
    try {
      await saveTeamUrl(url.trim())
      onSaved?.()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo guardar el equipo'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <CourtGridBackground />

      <div className="screen-enter relative z-10 w-full max-w-md">
        <div className="mb-6 flex items-center gap-2">
          <span className="flex size-2.5 rounded-full bg-primary" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Federación Canaria de Pádel
          </span>
        </div>

        <h1 className="text-balance text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
          Vincula tu <span className="text-primary">equipo</span>
        </h1>

        <p className="mt-4 max-w-sm text-pretty text-muted-foreground">
          Pega el link de la página de tu equipo en la federación para importar automáticamente la plantilla y los puntos.
        </p>

        <p className="mt-2 font-mono text-[11px] text-muted-foreground/80">
          Ejemplo: padelfederacion.es/.../Ligas_Equipo.asp?IdEquipo=...
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div className="relative">
            <Link2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="url"
              placeholder="https://padelfederacion.es/Paginas/Canarias/Ligas_Equipo.asp?..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-12 pl-9 text-base"
              disabled={isLoading}
              aria-label="Link del equipo en la federación"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="h-12 text-base font-semibold transition-transform active:scale-[0.98]"
          >
            {isLoading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
            {isLoading ? 'Guardando...' : 'Guardar y continuar'}
          </Button>
        </form>
      </div>
    </main>
  )
}

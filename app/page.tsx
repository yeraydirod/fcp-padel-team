'use client'

import { useState } from 'react'
import { useTeam } from '@/lib/use-team'
import { useAuth } from '@/lib/auth-context'
import { useUserProfile } from '@/lib/use-user-profile'
import { LoginScreen } from '@/components/login-screen'
import { OnboardingForm } from '@/components/onboarding-form'
import { RosterSection } from '@/components/roster-section'
import { PairSimulator } from '@/components/pair-simulator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { CourtGridBackground } from '@/components/court-grid-background'
import { Users, Swords, AlertTriangle, LogOut, Settings2 } from 'lucide-react'

export default function Page() {
  const { user, isLoading: isAuthLoading, signOutUser } = useAuth()
  const { isLoading: isProfileLoading, hasTeam, profile } = useUserProfile()
  const { team, players, isLoading, error } = useTeam()
  const [isEditingTeam, setIsEditingTeam] = useState(false)

  if (isAuthLoading) {
    return <AuthLoadingScreen />
  }

  if (!user) {
    return <LoginScreen />
  }

  if (isProfileLoading) {
    return <ProfileLoadingScreen />
  }

  if (!hasTeam || isEditingTeam) {
    return <OnboardingForm onSaved={() => setIsEditingTeam(false)} />
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Header team={team} isLoading={isLoading} playerCount={players.length} />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-6">
        {error ? (
          <div className="py-6">
            <ErrorState
              message={error.message}
              onEditTeam={() => setIsEditingTeam(true)}
            />
          </div>
        ) : (
          <Tabs defaultValue="equipo" className="w-full gap-0">
            <div className="sticky top-0 z-20 -mx-4 border-b border-border/60 bg-background/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
              <TabsList className="h-12 w-full rounded-xl bg-muted p-1 group-data-horizontal/tabs:h-12">
                <TabsTrigger
                  value="equipo"
                  className="h-full flex-1 gap-2 rounded-lg px-4 text-sm font-semibold data-active:bg-primary data-active:text-primary-foreground data-active:shadow-none"
                >
                  <Users className="size-4" />
                  Equipo
                </TabsTrigger>
                <TabsTrigger
                  value="simulador"
                  className="h-full flex-1 gap-2 rounded-lg px-4 text-sm font-semibold data-active:bg-primary data-active:text-primary-foreground data-active:shadow-none"
                >
                  <Swords className="size-4" />
                  Simulador
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="py-5 pb-8">
              <TabsContent value="equipo" className="mt-0" keepMounted>
                {isLoading ? <RosterSkeleton /> : <RosterSection players={players} />}
              </TabsContent>

              <TabsContent value="simulador" className="mt-0" keepMounted>
                {isLoading ? (
                  <RosterSkeleton />
                ) : players.length < 10 ? (
                  <p className="py-12 text-center text-muted-foreground">
                    Se necesitan al menos 10 jugadores para formar 5 parejas.
                  </p>
                ) : (
                  <PairSimulator
                    key={`${user.uid}-${profile?.teamUrl ?? 'no-team'}`}
                    players={players}
                  />
                )}
              </TabsContent>
            </div>
          </Tabs>
        )}
      </div>

      <AppFooter
        onSignOut={signOutUser}
        onEditTeam={() => setIsEditingTeam(true)}
      />
    </main>
  )
}

function AuthLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Skeleton className="h-12 w-48 rounded-lg" />
    </div>
  )
}

function ProfileLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Skeleton className="h-12 w-56 rounded-lg" />
    </div>
  )
}

function Header({
  team,
  isLoading,
  playerCount,
}: {
  team: ReturnType<typeof useTeam>['team']
  isLoading: boolean
  playerCount: number
}) {
  return (
    <header className="relative overflow-hidden border-b border-border/60 bg-sidebar">
      <CourtGridBackground opacity={0.07} />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-primary" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
            FCP · Pádel
          </span>
        </div>

        <h1 className="mt-2 text-balance text-2xl font-extrabold uppercase leading-tight tracking-tight text-foreground sm:text-3xl">
          {isLoading ? (
            <Skeleton className="h-8 w-48" />
          ) : (
            <>
              {team?.equipo || 'Equipo'} <span className="text-primary">Pádel</span>
            </>
          )}
        </h1>

        {isLoading ? (
          <Skeleton className="mt-1.5 h-4 w-64" />
        ) : (
          <p className="mt-1 truncate text-sm text-muted-foreground">{team?.liga}</p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          <Stat label="Jugadores" value={isLoading ? '—' : String(playerCount)} />
          <Stat label="Categoría" value={isLoading ? '—' : team?.categoria || '—'} />
          <Stat label="Capitán" value={isLoading ? '—' : team?.capitan || '—'} />
        </div>
      </div>
    </header>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/60 bg-card/80 px-2.5 py-1.5">
      <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="max-w-[10rem] truncate font-mono text-xs font-semibold text-card-foreground">
        {value}
      </p>
    </div>
  )
}

function AppFooter({
  onSignOut,
  onEditTeam,
}: {
  onSignOut: () => void
  onEditTeam: () => void
}) {
  return (
    <footer className="mt-auto border-t border-border/60 bg-sidebar/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-1 px-4 py-3 sm:px-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onEditTeam}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <Settings2 className="size-4" />
          Cambiar equipo
        </Button>
        <span className="text-border" aria-hidden>
          ·
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onSignOut}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="size-4" />
          Cerrar sesión
        </Button>
      </div>
    </footer>
  )
}

function ErrorState({
  message,
  onEditTeam,
}: {
  message: string
  onEditTeam: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-destructive/40 bg-destructive/10 py-16 text-center">
      <AlertTriangle className="size-8 text-destructive" />
      <p className="font-semibold text-foreground">No se pudieron cargar los datos</p>
      <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      <Button variant="outline" size="sm" onClick={onEditTeam} className="mt-2">
        Revisar link del equipo
      </Button>
    </div>
  )
}

function RosterSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-xl" />
      ))}
    </div>
  )
}

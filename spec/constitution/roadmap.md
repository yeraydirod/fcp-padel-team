# Roadmap

_Orden y estado de las features. Es la vista de "qué hay hecho, qué toca ahora y qué viene". Cada entrada apunta a su carpeta en `features/`._

## Hecho ✅

_Features completadas, en orden de implementación._

1. **001 · Login con Google (Firebase)** — SDK, contexto de sesión, pantalla de login y logout. Requiere `.env.local` con config Firebase real para probar autenticación.
2. **002 · Onboarding: vincular link de equipo** — Firestore `users/{uid}`, formulario de vinculación, scraping parametrizado y API autenticada con Firebase Admin.
3. **003 · Dashboard de equipo** — dashboard con datos del equipo vinculado, gating login → onboarding → dashboard, CTA de error hacia onboarding.
4. **004 · Simulador de parejas de jornada** — simulador integrado con datos por usuario; reinicio de estado al cambiar equipo (`key` en `PairSimulator`).
5. **005 · Pulido UX mobile-first** — chrome compacto, switch segmentado, footer de cuenta, fichas sin tiers, simulador selección-primero. Ver [`features/005-mobile-ux-polish/`](../features/005-mobile-ux-polish/).
6. **006 · Ajustes UX roster y simulador** — grid 2 cols, asientos legibles, estado de simulación al cambiar de tab. Ver [`features/006-roster-sim-ux/`](../features/006-roster-sim-ux/).

## Siguiente 🔜

_Ninguna feature en curso._

## Backlog / ideas 💡

_Sin comprometer ni ordenar del todo. Ideas que respetan la constitución._

- **Exportar PDF de la plantilla** — una vez simulada la jornada, poder imprimir/descargar la plantilla oficial en PDF con los datos de las parejas y jugadores. Prevista para una versión posterior a 001-004.

> Cada feature nueva se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código.

# 003 · Dashboard de equipo — Tareas

_Checklist accionable derivada del `plan.md`. Tareas pequeñas y concretas; marca `[x]` al completarlas._

- [x] Confirmar que `/api/team` depende de la feature 002 (URL por usuario) antes de dar esto por cerrado.
- [x] Ajustar `lib/use-team.ts` para no hacer fetch sin usuario/`teamUrl`, y revalidar si cambia el `teamUrl` (key de SWR incluye `teamUrl`).
- [x] Revisar el gating en `app/page.tsx`: login → onboarding → dashboard, en ese orden.
- [x] Añadir CTA "Revisar link del equipo" en el estado de error del dashboard.
- [x] Validar contra los criterios de aceptación de `spec.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.

## Mantenimiento (checklist recurrente)

- [ ] Si la federación cambia el HTML de la página de equipo, revisar el parseo en `lib/scrape.ts` y este dashboard en conjunto.

# 002 · Onboarding: vincular link de equipo — Tareas

_Checklist accionable derivada del `plan.md`. Tareas pequeñas y concretas; marca `[x]` al completarlas._

- [x] Definir la colección `users/{uid}` en Firestore y sus reglas de seguridad (solo el propio usuario lee/escribe su documento). Documentadas en `firestore.rules`.
- [x] Crear `lib/user-profile.ts` con `getUserProfile` y `setTeamUrl`.
- [x] Crear el hook `useUserProfile()`.
- [x] Parametrizar `scrapeTeam(url)` en `lib/scrape.ts` (dejar de depender solo de la constante `FEDERATION_URL`).
- [x] Adaptar `app/api/team/route.ts` para usar la URL del usuario autenticado (verificando Bearer token con Firebase Admin) y devolver error claro si falta.
- [x] Crear `components/onboarding-form.tsx` con validación de URL y guardado.
- [x] Adaptar `app/page.tsx` para mostrar el onboarding cuando falte `teamUrl`, y una acción para editarlo después.
- [x] Validar contra los criterios de aceptación de `spec.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.

## Mantenimiento (checklist recurrente)

- [ ] Si cambia el formato de las URLs de la federación, revisar la validación del formulario y el parseo de `lib/scrape.ts`.

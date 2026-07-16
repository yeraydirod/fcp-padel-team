# 001 · Login con Google (Firebase) — Tareas

_Checklist accionable derivada del `plan.md`. Tareas pequeñas y concretas; marca `[x]` al completarlas._

- [x] Crear/configurar el proyecto de Firebase y habilitar el proveedor de Google en Authentication. (Preparado en el código; el usuario debe completar `.env.local` con los datos de su proyecto.)
- [x] Añadir variables de entorno `NEXT_PUBLIC_FIREBASE_*` (local y Vercel) y documentarlas en `.env.example`.
- [x] Añadir dependencia `firebase` e inicializar el SDK en `lib/firebase.ts`.
- [x] Crear `lib/auth-context.tsx` con `AuthProvider` y hook `useAuth()`.
- [x] Envolver la app con `<AuthProvider>` en `app/layout.tsx`.
- [x] Crear `components/login-screen.tsx` con botón "Continuar con Google" y manejo de error/carga.
- [x] Adaptar `app/page.tsx` para mostrar login o contenido según sesión, y añadir botón de cerrar sesión.
- [x] Retirar `next-auth`, `drizzle-orm`, `@neondatabase/serverless`, `@auth/drizzle-adapter` y `drizzle-kit` de `package.json`.
- [x] Configurar ESLint flat config para que `npm run lint` funcione con Next.js 16.
- [x] Validar contra los criterios de aceptación de `spec.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.

## Mantenimiento (checklist recurrente)

- [ ] Si se rota o cambia la config de Firebase, actualizar las variables de entorno en todos los entornos (local, Vercel).

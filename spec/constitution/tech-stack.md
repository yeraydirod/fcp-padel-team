# Tech stack y convenciones

_Cómo está construido el proyecto y las reglas que todo el código debe respetar. Es la referencia técnica que ningún plan de feature debería contradecir._

## Tecnologías

- **Lenguaje:** TypeScript estricto.
- **Framework / runtime:** Next.js 16 (App Router) + React 19, sobre Node.
- **Autenticación:** Firebase Authentication, proveedor Google (`signInWithPopup` + `GoogleAuthProvider`).
- **Base de datos:** Firestore (Firebase) — perfil de usuario y URL de equipo vinculada. API de servidor usa Firebase Admin SDK para verificar tokens y leer perfiles.
- **Scraping:** `cheerio` sobre el HTML público de la Federación Canaria de Pádel, a partir de la URL de equipo guardada por cada usuario.
- **UI:** Tailwind CSS v4 + shadcn/ui (`components/ui/*`) + iconos `lucide-react`.
- **Data fetching cliente:** SWR.
- **Tests:** no hay suite todavía — se valida con `pnpm build`, `pnpm lint` y comprobación manual de los criterios de aceptación de cada feature.
- **Despliegue:** Vercel (incluye `@vercel/analytics`).

## Archivos / módulos clave

- `app/page.tsx` — página principal, orquesta cabecera + tabs de Equipo/Simulador.
- `app/api/team/route.ts` — endpoint que ejecuta el scraping y devuelve `TeamData`.
- `lib/scrape.ts` — lógica de scraping con `cheerio`; expone `scrapeTeam(url)` con la URL del equipo del usuario.
- `lib/types.ts` — tipos de dominio: `Player`, `TeamData`, `Pair`.
- `lib/firebase.ts` — inicialización lazy del SDK cliente (Auth + Firestore).
- `lib/firebase-admin.ts` — Firebase Admin SDK para verificar tokens en `/api/team`.
- `lib/auth-context.tsx` — contexto de sesión (`AuthProvider`, `useAuth`).
- `lib/user-profile.ts` — lectura/escritura del perfil en Firestore (`users/{uid}`).
- `lib/use-user-profile.ts` — hook SWR del perfil de usuario.
- `lib/player-utils.ts` — utilidades de presentación de jugador (iniciales, color de avatar, tier por puntos).
- `components/roster-section.tsx`, `components/player-card.tsx`, `components/player-avatar.tsx` — listado de jugadores del dashboard.
- `lib/use-team.ts` — hook SWR `useTeam()` para consumir `/api/team` desde el cliente (con Bearer token).
- `components/login-screen.tsx`, `components/onboarding-form.tsx`, `components/court-grid-background.tsx` — pantallas de auth/onboarding y fondo de pista reutilizable.
- `components/pair-simulator.tsx` — simulador de parejas de una jornada.
- `components/ui/*` — primitivas shadcn/ui (button, card, input, select, tabs, badge, skeleton).
- `firestore.rules` — reglas de seguridad de Firestore (referencia para desplegar en Console).

## Comandos

- `npm run dev` — arranca el entorno local (`next dev`).
- `npm run build` — compila para producción (`next build`).
- `npm run start` — sirve el build de producción.
- `npm run lint` — revisa el estilo (`eslint .`).

## Modelo de datos / dominio

- `Player` (`lib/types.ts`) — `num`, `licencia` (identificador único del jugador en la federación), `nombre`, `apellidos`, `fullName`, `puntos`, `edad`. Todo de solo lectura, viene del scraping.
- `TeamData` (`lib/types.ts`) — `equipo`, `liga`, `categoria`, `capitan`, `jugadores: Player[]`.
- `Pair` (`lib/types.ts`) — `id`, `playerA`, `playerB` (ambos `Player | null` mientras se completa la pareja).
- `UserProfile` (Firestore, colección `users/{uid}`, nueva con la feature 001/002) — `uid`, `email`, `teamUrl` (URL de la federación vinculada al equipo del usuario, o ausente si aún no ha hecho el onboarding), `createdAt`.

## Convenciones

- Nombres de variables/funciones en camelCase; componentes React en PascalCase; un componente por archivo en `components/`.
- Contenido de UI y textos de usuario en español (es-ES), como el resto de la app.
- Componentes de cliente marcados explícitamente con `'use client'` cuando usan estado/hooks del navegador.
- Los datos de jugadores/equipo son siempre de solo lectura en la UI; cualquier corrección va en la fuente (federación), no en la app.
- Manejo de errores de scraping/API: devolver mensajes en español, legibles por el usuario final (ver `ErrorState` en `app/page.tsx`).

## Estilo visual

- Tema oscuro por defecto (`viewport.colorScheme = 'dark'` en `app/layout.tsx`), con acentos en el color `primary` (verde lima estilo pista de pádel).
- Tipografías: `Archivo` (sans, texto general) y `Space Grotesk` (mono, datos/números/etiquetas), cargadas como variables CSS en `app/layout.tsx`.
- Componentes con esquinas redondeadas, bordes sutiles (`border-border/60`) y tarjetas (`bg-card`) siguiendo shadcn/ui.
- Layout mobile-first, con `max-w-6xl` centrado en pantallas grandes.

## Límites duros

- No subir credenciales, claves de Firebase de servidor ni `.env*` al repositorio.
- No romper el scraping existente de `lib/scrape.ts` al parametrizar la URL por usuario.
- No añadir dependencias de pago o servicios externos nuevos sin avisar antes.
- No introducir edición manual de datos de jugadores/equipo: siempre deben reflejar lo scrapeado de la federación.

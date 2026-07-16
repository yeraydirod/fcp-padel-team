# 002 · Onboarding: vincular link de equipo — Plan

_Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`._

## Enfoque

Guardar la URL del equipo en Firestore, en un documento por usuario (`users/{uid}`, campo `teamUrl`). Al cargar la app tras el login, se lee ese documento: si no existe o no tiene `teamUrl`, se muestra el formulario de onboarding; si existe, se usa esa URL para pedir los datos del equipo a `/api/team`. Se parametriza `scrapeTeam()` para aceptar la URL en vez de depender de la constante global.

## Implementación

1. Definir la colección Firestore `users/{uid}` con `{ email, teamUrl, createdAt, updatedAt }`. Añadir reglas de seguridad de Firestore: un usuario solo puede leer/escribir su propio documento (`request.auth.uid == uid`).
2. Crear `lib/user-profile.ts` con funciones `getUserProfile(uid)` y `setTeamUrl(uid, url)` sobre Firestore (SDK cliente, vía `lib/firebase.ts` de la feature 001).
3. Crear un hook `useUserProfile()` que, dado el `user` de `useAuth()`, exponga `{ profile, isLoading, saveTeamUrl }`.
4. Modificar `lib/scrape.ts`: cambiar `scrapeTeam()` para que reciba la URL como parámetro (`scrapeTeam(url: string)`), eliminando la dependencia directa de la constante `FEDERATION_URL` (se puede dejar como valor por defecto de desarrollo/documentación, no como único origen).
5. Modificar `app/api/team/route.ts` para leer la URL del equipo del usuario autenticado (a partir del `uid` recibido, p. ej. vía token verificado o parámetro) y pasarla a `scrapeTeam(url)`. Devolver un error específico si el usuario no tiene `teamUrl` todavía.
6. Crear `components/onboarding-form.tsx`: input de URL + validación de formato + botón "Guardar" que llama a `saveTeamUrl`; muestra estado de error si el scraping posterior falla.
7. Adaptar `app/page.tsx`: cuando hay sesión pero no hay `teamUrl`, mostrar `OnboardingForm` en vez de los tabs de equipo/simulador. Añadir una acción (p. ej. en la cabecera) para volver a abrir el formulario y cambiar el link.

## Decisiones

- **Firestore en vez de Postgres/Drizzle** — decisión ya tomada en la constitución: al usar Firebase para auth, Firestore evita mantener una base de datos y un ORM adicionales para un documento tan simple por usuario.
- **Validación de formato de URL, no de contenido, en el cliente** — comprobar que es una URL bien formada es rápido y da feedback inmediato; la validación "real" (que existan datos de equipo) se delega al primer scraping tras guardar.
- **Un solo campo `teamUrl` por usuario** — coherente con el principio "un usuario, un equipo" de `mission.md`; no se modela una tabla de equipos aparte por ahora.

## Riesgos

- **Usuario pega una URL que no es de un equipo** (p. ej. la home de la federación) — el scraping devolverá datos vacíos o un error; mitigar mostrando un mensaje claro pidiendo revisar el link, sin romper la app.
- **Cambios en el formato de las URLs de la federación** — mitigar manteniendo la validación de formato laxa (solo "es una URL http/https"), dejando que sea el scraping quien detecte si los datos no tienen sentido.
- **Reglas de seguridad de Firestore mal configuradas** — mitigar probando explícitamente que un usuario no puede leer/escribir el documento de otro antes de cerrar la feature.

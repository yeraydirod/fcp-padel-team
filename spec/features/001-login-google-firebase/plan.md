# 001 · Login con Google (Firebase) — Plan

_Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`._

## Enfoque

Usar el SDK cliente de Firebase Authentication con el proveedor de Google (`signInWithPopup` + `GoogleAuthProvider`). Se crea un contexto de sesión en React que envuelve la app en `app/layout.tsx` y expone el usuario actual a cualquier componente. Las páginas que requieren sesión comprueban ese contexto y redirigen a una pantalla de login si no hay usuario.

## Implementación

1. Crear proyecto de Firebase (o usar uno existente) y habilitar el proveedor de Google en Authentication. Guardar la config del cliente (`apiKey`, `authDomain`, `projectId`, etc.) como variables de entorno `NEXT_PUBLIC_FIREBASE_*`.
2. Añadir dependencia `firebase` al proyecto e inicializar el SDK en un módulo nuevo `lib/firebase.ts` (app + `getAuth()`).
3. Crear `lib/auth-context.tsx` (`'use client'`): `AuthProvider` con `onAuthStateChanged`, expone `{ user, isLoading, signInWithGoogle, signOut }` vía un hook `useAuth()`.
4. Envolver `children` en `app/layout.tsx` con `<AuthProvider>`.
5. Crear `components/login-screen.tsx`: pantalla con botón "Continuar con Google" (usa `useAuth().signInWithGoogle`), estado de carga y mensaje de error si falla el popup.
6. Adaptar `app/page.tsx` (o un wrapper) para: mostrar `LoginScreen` si `!user` (y no está cargando), y el contenido actual (tabs de equipo/simulador) si `user` existe. Añadir botón de "Cerrar sesión" visible en la cabecera cuando hay sesión.
7. Retirar del `package.json` las dependencias no usadas `next-auth`, `drizzle-orm`, `@neondatabase/serverless` y su config asociada (si existiera), para alinear el proyecto con `constitution/tech-stack.md`.

## Decisiones

- **Firebase Auth (cliente) en vez de NextAuth** — el proyecto ya apuntaba a usar Firebase para todo lo relacionado con usuario (mission.md); mantener `next-auth` en paralelo añadiría un segundo sistema de sesión sin necesidad. Se descarta `next-auth`.
- **`signInWithPopup` en vez de `signInWithRedirect`** — más simple de integrar en una SPA con App Router y suficiente para el caso de uso (no hay restricciones conocidas de navegador que lo impidan). Se puede revisar si da problemas en algún dispositivo.
- **Contexto de React en vez de middleware de Next** — al ser una app pequeña con una sola sección protegida, comprobar la sesión en el cliente es suficiente; no se añade middleware de servidor para proteger rutas en esta feature.

## Riesgos

- **Popup bloqueado por el navegador** — mitigar mostrando un mensaje claro y un botón para reintentar; considerar fallback a `signInWithRedirect` si se detectan problemas frecuentes.
- **Variables de entorno de Firebase mal configuradas en producción (Vercel)** — mitigar documentando las variables necesarias y verificando el login en un despliegue de prueba antes de dar la feature por terminada.

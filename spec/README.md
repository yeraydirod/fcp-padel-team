# spec/ — Spec Driven Development de Padel Team App

> Aquí vive la especificación completa del proyecto: primero se escribe la spec, luego el plan, luego las tareas, y solo entonces se toca el código. Antes de implementar o cambiar una feature, lee su `spec.md` y `plan.md`; antes de proponer algo nuevo, revisa que encaje con `constitution/mission.md` y `constitution/tech-stack.md`.

## Qué construimos

Una app para un equipo de pádel de la Federación Canaria de Pádel: login con Google, importación automática de los datos del equipo por scraping de la federación, un dashboard con el equipo y sus jugadores, y un simulador para formar las parejas de una jornada. Detalle completo en [`constitution/mission.md`](constitution/mission.md).

## Estructura

```
spec/
├── constitution/                        ← reglas estables del proyecto
│   ├── mission.md                       ← qué construimos, para quién y qué NO es
│   ├── tech-stack.md                    ← stack real (Next.js, Firebase, Firestore...), convenciones y límites
│   └── roadmap.md                       ← estado y orden de las features
└── features/                            ← una carpeta por feature, con spec + plan + tasks
    ├── 001-login-google-firebase/       ← login con Google (Firebase Auth)
    ├── 002-onboarding-team-link/        ← vincular el link del equipo de la federación al usuario
    ├── 003-dashboard-equipo/            ← nombre de equipo, capitán y listado de jugadores
    ├── 004-simulador-parejas/           ← simulación de parejas de una jornada, ordenadas por puntos
    ├── 005-mobile-ux-polish/            ← pulido UX mobile-first (chrome, fichas, simulador)
    └── 006-roster-sim-ux/               ← grid roster, asientos legibles, estado al cambiar tab
```

Cada feature tiene:

- `spec.md` — qué hace, por qué, y criterios de aceptación comprobables.
- `plan.md` — enfoque técnico, pasos de implementación y decisiones tomadas.
- `tasks.md` — checklist de tareas para llevarla a "Hecho".

## Estado actual

Consulta [`constitution/roadmap.md`](constitution/roadmap.md) para el estado vivo. Las features 001–006 están **implementadas**. Para probar el flujo completo en local:

1. Crea un proyecto en Firebase Console (Authentication con Google + Firestore).
2. Copia `.env.example` a `.env.local` y rellena las variables `NEXT_PUBLIC_FIREBASE_*` y `FIREBASE_ADMIN_*`.
3. Despliega las reglas de `firestore.rules` en Firebase Console.
4. Ejecuta `npm run dev` y prueba: login → vincular equipo → dashboard → simulador.

**Backlog:** exportar a PDF la plantilla simulada (sin carpeta de feature todavía).

## Flujo para una feature nueva

1. Crear `features/NNN-nombre-feature/` con el siguiente número libre (`005`, `006`, …).
2. Escribir `spec.md`: qué hace, por qué y criterios de aceptación medibles.
3. Escribir `plan.md`: enfoque técnico y decisiones, respetando `constitution/tech-stack.md`.
4. Desglosar en `tasks.md` y marcar el progreso.
5. Implementar y validar (`npm run build` / `npm run lint`, más los criterios de aceptación de la `spec.md`).
6. Actualizar `constitution/roadmap.md` (mover la feature a "Hecho").

> La constitución manda: si una feature choca con `mission.md` o `tech-stack.md`, se replantea la feature, no la constitución.

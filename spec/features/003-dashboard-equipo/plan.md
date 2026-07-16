# 003 · Dashboard de equipo — Plan

_Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`._

## Enfoque

La UI del dashboard ya está construida ([app/page.tsx](../../../app/page.tsx), [components/roster-section.tsx](../../../components/roster-section.tsx), [components/player-card.tsx](../../../components/player-card.tsx)) y no necesita rediseño. El trabajo de esta feature es de "cableado": que la petición a `/api/team` devuelva los datos del equipo del usuario autenticado (vía `teamUrl` guardada en la feature 002) en vez de la URL fija actual, y que el dashboard solo sea visible cuando hay sesión y equipo vinculado.

## Implementación

1. Confirmar que `app/api/team/route.ts` y `lib/scrape.ts` ya están parametrizados por usuario (dependencia de la feature 002); si no, no se puede cerrar esta feature.
2. En `lib/use-team.ts`, asegurar que `useTeam()` solo hace fetch cuando hay usuario autenticado y `teamUrl` disponible (evitar llamadas innecesarias o con datos de otro usuario al cambiar de sesión).
3. Revisar `app/page.tsx` para que el orden de gating sea: sin sesión → login (001); con sesión sin `teamUrl` → onboarding (002); con sesión y `teamUrl` → tabs de Equipo/Simulador actuales.
4. Sin cambios visuales adicionales en `components/roster-section.tsx` / `components/player-card.tsx` salvo que surja algún ajuste menor al probar con datos reales de distintos equipos (p. ej. equipos con menos jugadores).

## Decisiones

- **Reutilizar la UI existente tal cual** — ya cumple los criterios de aceptación visualmente; el riesgo real está en la fuente de datos, no en el diseño.
- **`useTeam()` no dispara fetch sin `teamUrl`** — evita una llamada a `/api/team` que fallaría o devolvería el equipo por defecto mientras el usuario está en onboarding.

## Riesgos

- **Equipos con muy pocos jugadores** — el aviso de "se necesitan al menos 10 jugadores" para el simulador (004) ya existe; verificar que el dashboard en sí no asume un mínimo de jugadores.
- **Cache de SWR mostrando datos del equipo anterior tras cambiar `teamUrl`** — mitigar invalidando/revalidando la key de SWR cuando cambia el `teamUrl` del usuario.

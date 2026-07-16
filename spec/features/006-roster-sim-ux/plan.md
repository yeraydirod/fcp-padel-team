# 006 · Ajustes UX roster y simulador — Plan

## Enfoque

Tres cambios de presentación/estado local sobre el dashboard 005, sin tocar scraping ni lógica de slots.

## Implementación

1. Documentar feature y actualizar roadmap.
2. `roster-section.tsx`: `grid grid-cols-1 sm:grid-cols-2`.
3. `pair-simulator.tsx` (`PairLane`): filas verticales con tipografía legible.
4. `page.tsx`: `keepMounted` en ambos `TabsContent`.
5. Validar lint/build.

## Decisiones

- **`keepMounted` en vez de levantar estado** — Base UI ya lo soporta; el `key` por equipo/usuario sigue reseteando al cambiar vínculo.
- **Jugadores apilados** — prioridad a legibilidad y copia frente a densidad lado a lado.

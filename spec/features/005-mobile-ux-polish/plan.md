# 005 · Pulido UX mobile-first — Plan

_Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`._

## Enfoque

Pulido de presentación sobre el dashboard ya implementado (003 + 004). Sin nuevas rutas ni persistencia. El switch sigue siendo estado local con `Tabs`. Se compacta el chrome, se reordena el simulador (selección primero) y se rediseña la pista de 5 plazas.

## Implementación

1. Documentar la feature (`spec.md` / `plan.md` / `tasks.md`) y moverla a "Siguiente" en el roadmap.
2. Reescribir el chrome en `app/page.tsx`: header compacto, `TabsList` sticky como segmented control, footer con Cambiar equipo / Cerrar sesión.
3. Rediseñar `PlayerCard`: quitar `getTier`, jerarquía puntos > licencia > edad; densificar filas en móvil.
4. Reordenar y rediseñar `PairSimulator`: disponibles primero, pista de 5 plazas con placeholders fijos, empty state orientativo.
5. Limpiar `getTier` de `lib/player-utils.ts` si queda sin usos.
6. Validar en viewport ~390px y con `npm run lint` / `npm run build`.

## Decisiones

- **Footer al final del scroll, no barra fija inferior** — evita tapar controles del simulador; el contenido lleva `pb` suficiente.
- **Selección primero en móvil** — la acción principal es elegir jugadores; el resultado (parejas) va debajo. En `lg+`, columnas `[disponibles | parejas]`.
- **Pista de 5 plazas** — misma estructura vacía o llena; al completar, reorden por puntos (004) con medallas.
- **Edad terciaria** — no se elimina del sort del roster ni del scrape.

## Riesgos

- **Sticky switch + header** — comprobar que el sticky no tape contenido ni solape mal con el fondo.
- **Regresión 003/004** — mantener criterios de listado, sort, ranking y acciones Aleatorio / Autocompletar / Reiniciar.

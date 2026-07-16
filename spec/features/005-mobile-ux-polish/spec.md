# 005 · Pulido UX mobile-first

**Estado:** implementado ✅

## Qué hace

Ajusta la presentación del dashboard (chrome, fichas de jugador y simulador de parejas) para un uso prioritario en móvil: cabecera más compacta, switch Equipo/Simulador con aspecto de control segmentado, acciones secundarias (cambiar equipo / cerrar sesión) en un footer, fichas centradas en puntos y licencia (sin tiers inventados), y un simulador con selección primero y visualización de parejas más estructurada.

## Por qué

La mayoría de capitanes y jugadores usarán la app en el móvil. El header alto, los tags de nivel redundantes, la jerarquía edad > licencia y el layout del simulador (resultado antes que selección, parejas desestructuradas en vacío) dificultan el flujo principal sin aportar valor.

## Criterios de aceptación

- [x] La cabecera muestra el equipo, la liga y las stats (jugadores / categoría / capitán) sin los botones "Cambiar equipo" ni "Cerrar sesión".
- [x] "Cambiar equipo" y "Cerrar sesión" están en un footer al final del scroll del dashboard autenticado.
- [x] El switch Equipo / Simulador se ve y se usa como control segmentado (estado activo/inactivo claro), sticky bajo el header, con área táctil cómoda.
- [x] Las fichas de jugador no muestran tiers inventados (Élite, Avanzado, Intermedio, Iniciación).
- [x] En cada ficha, puntos y licencia tienen más peso visual que la edad; la edad puede aparecer como meta terciaria.
- [x] En viewport estrecho, el simulador muestra la lista de disponibles antes que el bloque de parejas/ranking.
- [x] El bloque de parejas mantiene estructura fija con 5 plazas y huecos "Libre" del mismo tamaño aunque no haya jugadores asignados.
- [x] Con 0 jugadores asignados, hay un mensaje breve de orientación encima de la pista de parejas.
- [x] Al completar las 5 parejas, el ranking por puntos sigue mostrándose (comportamiento de la feature 004).
- [x] La edad sigue disponible en el modelo y en el orden del roster; solo cambia su protagonismo visual.

## Fuera de alcance

- Exportar PDF, persistir simulaciones, rutas por URL para Equipo/Simulador.
- Cambios de scraping, Firebase o lógica de asignación de parejas.

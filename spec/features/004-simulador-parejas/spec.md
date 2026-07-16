# 004 · Simulador de parejas de jornada

**Estado:** implementado ✅

## Qué hace

Dentro del dashboard, en la pestaña "Simulador", el usuario puede formar las 5 parejas que jugarían una jornada eligiendo jugadores del equipo (manualmente, pulsando en la lista de disponibles; de forma aleatoria; o autocompletando los huecos libres con los jugadores que queden). Puede quitar un jugador de una pareja o reiniciar toda la simulación. Cuando las 5 parejas están completas (10 jugadores asignados), se muestra un ranking de las parejas ordenado de mayor a menor según la suma de puntos de sus dos jugadores.

## Por qué

Es la feature principal del proyecto: ayuda al capitán a decidir y visualizar rápidamente cómo formar la plantilla de una jornada y en qué orden de puntos quedarían las parejas, sin tener que calcularlo a mano.

## Criterios de aceptación

- [ ] El simulador solo se ofrece si el equipo tiene al menos 10 jugadores; si no, se muestra un aviso explicando que faltan jugadores.
- [ ] Un jugador no puede estar en más de una pareja a la vez; una vez asignado, desaparece de la lista de "disponibles".
- [ ] Se puede asignar un jugador pulsando sobre él en la lista de disponibles, que lo coloca en el primer hueco libre.
- [ ] Se puede quitar un jugador de una pareja, y vuelve a aparecer en la lista de disponibles.
- [ ] La acción "Aleatorio" reparte 10 jugadores al azar en las 5 parejas, sustituyendo la selección actual.
- [ ] La acción "Autocompletar" rellena solo los huecos libres restantes con jugadores disponibles, sin tocar las parejas ya asignadas.
- [ ] La acción "Reiniciar" vacía todas las parejas.
- [ ] Mientras la simulación está incompleta, las parejas se muestran en su orden de formación (1 a 5), no por puntos.
- [ ] En cuanto las 5 parejas están completas, se muestran ordenadas de mayor a menor por la suma de puntos de sus dos jugadores, con una posición (1º, 2º, 3º...) visible.
- [ ] Se ve en todo momento cuántos jugadores están asignados sobre el total necesario (p. ej. "6/10").

## Fuera de alcance

- Exportar o imprimir la plantilla resultante en PDF — queda como idea de backlog para una versión futura (ver `../../constitution/roadmap.md`).
- Guardar/recordar simulaciones anteriores entre sesiones: cada simulación empieza en blanco al entrar en la pestaña.
- Sugerir automáticamente la combinación "óptima" de parejas (más allá del reparto aleatorio/autocompletar simples ya descritos).

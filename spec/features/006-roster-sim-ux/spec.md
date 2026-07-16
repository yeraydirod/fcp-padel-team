# 006 · Ajustes UX roster y simulador

**Estado:** implementado ✅

## Qué hace

Mejora el listado de jugadores en pantallas anchas (2 columnas), hace legibles los asientos de cada pareja en el simulador (nombre, licencia y puntos fáciles de leer y copiar), y conserva el estado de la simulación al cambiar entre las pestañas Equipo y Simulador.

## Por qué

En web el roster a una sola columna desperdicia espacio. En el resultado de parejas, las mini-cards lado a lado dejan nombre, puntos y licencia ilegibles para el capitán. Además, al cambiar de pestaña se perdía la simulación en curso porque el panel se desmontaba.

## Criterios de aceptación

- [x] En viewport estrecho el roster sigue en 1 columna; desde breakpoint `sm` usa 2 columnas.
- [x] Cada asiento de pareja muestra nombre completo, licencia y puntos con tipografía legible (sin texto micro ilegible).
- [x] Licencia y puntos no se truncan; el texto es seleccionable para copiar.
- [x] Los dos jugadores de una pareja van apilados en vertical, no en mini-cards lado a lado.
- [x] Al cambiar de Equipo a Simulador y volver, la simulación en curso se conserva (asignaciones intactas).
- [x] Al cambiar de equipo o usuario, la simulación se reinicia (comportamiento existente vía `key`).

## Fuera de alcance

- Persistencia de la simulación entre recargas o sesiones.
- Exportar PDF.
- Cambios de scraping o algoritmo de emparejamiento.

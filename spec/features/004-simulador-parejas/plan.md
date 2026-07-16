# 004 · Simulador de parejas de jornada — Plan

_Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`._

## Enfoque

El simulador ya está implementado en [components/pair-simulator.tsx](../../../components/pair-simulator.tsx) con estado local de React (sin persistencia), cubriendo asignación manual, aleatoria, autocompletado, eliminación, reinicio y ranking por puntos cuando está completo. El trabajo de esta feature es formalizar ese comportamiento como spec, verificarlo contra los criterios de aceptación y dejarlo listo para operar con los datos por-usuario de las features 002/003 (en vez de con el equipo fijo actual).

## Implementación

1. Revisar `components/pair-simulator.tsx` contra cada criterio de aceptación de `spec.md` y anotar cualquier desviación encontrada.
2. Verificar en `app/page.tsx` que el aviso de "se necesitan al menos 10 jugadores" sigue funcionando cuando los jugadores vienen del equipo vinculado al usuario (no del equipo fijo de hoy).
3. Sin cambios de comportamiento previstos salvo los que surjan de la revisión anterior; si el simulador ya cumple todo, esta feature se cierra solo con la documentación y validación.

## Decisiones

- **Mantener el simulador sin persistencia entre sesiones** — coherente con "fuera de alcance" del spec; simplifica la feature y evita modelar un historial de simulaciones en Firestore por ahora.
- **No tocar el algoritmo de "Aleatorio"/"Autocompletar" existente** — ya cumple la necesidad descrita por el usuario (selección + orden por puntos); no se añade lógica de optimización de emparejamientos.

## Riesgos

- **Cambio de equipo (nuevo `teamUrl`) mientras hay una simulación en curso** — la lista de jugadores cambiaría bajo los pies del componente; mitigar reiniciando el estado del simulador si cambia el equipo activo (comprobar al integrar con 003).
- **Regresión al conectar con datos reales de distintos equipos** — verificar con al menos un equipo de exactamente 10 jugadores y otro con más, para confirmar que el aviso de mínimo y el ranking se comportan bien en ambos casos.

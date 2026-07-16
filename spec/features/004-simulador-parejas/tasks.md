# 004 · Simulador de parejas de jornada — Tareas

_Checklist accionable derivada del `plan.md`. Tareas pequeñas y concretas; marca `[x]` al completarlas._

- [x] Revisar `components/pair-simulator.tsx` contra cada criterio de aceptación de `spec.md` — sin desviaciones; el componente ya cumple la spec.
- [x] Confirmar que el aviso de mínimo de 10 jugadores en `app/page.tsx` sigue correcto con datos por-usuario (tras 002/003).
- [x] Implementar el reinicio del simulador al cambiar de equipo vinculado (`key={uid}-${teamUrl}` en `<PairSimulator />`).
- [x] Validar contra los criterios de aceptación de `spec.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.

## Mantenimiento (checklist recurrente)

- [ ] Si se añade la exportación a PDF (backlog), revisar que este componente exponga los datos de la simulación de forma reutilizable para esa feature futura.

# Misión

_Define la razón de ser del proyecto. Es la referencia que decide si una feature "encaja" o no._

## Qué construimos

Una aplicación web para un equipo de pádel de la Federación Canaria de Pádel que permite a sus jugadores/capitán iniciar sesión, importar automáticamente los datos oficiales de su equipo (por scraping del link de la federación) y simular la alineación de parejas para una jornada.

1. **Login con Google (Firebase)** — acceso a la app mediante cuenta de Google, sin gestión propia de contraseñas.
2. **Importación del equipo** — en el primer acceso, el usuario pega el link de su equipo en la Federación Canaria de Pádel; a partir de ahí se scrapean sus datos oficiales.
3. **Dashboard de equipo** — vista con el nombre del equipo, el capitán y un listado de jugadores con sus puntos y edad.
4. **Simulador de parejas** — selección de jugadores para formar las parejas de una jornada, con ranking final ordenado por puntos.

## Para quién

- Capitanes de equipos de pádel de la Federación Canaria que necesitan organizar la alineación de una jornada sin usar hojas de cálculo sueltas.
- Jugadores del equipo que quieren consultar el listado y los puntos del equipo de forma rápida y visual.

## Principios

- **Datos desde la fuente oficial** — los jugadores, puntos y datos del equipo siempre vienen del scraping de la federación, nunca se introducen manualmente.
- **Un usuario, un equipo** — cada cuenta se vincula a la URL de un único equipo de la federación; no hay gestión multi-equipo en el usuario.
- **Simplicidad sobre configurabilidad** — se prioriza que el flujo (login → vincular equipo → ver equipo → simular jornada) sea directo, antes que ofrecer opciones avanzadas.
- **Mobile-first** — la app se usa sobre todo desde el móvil, en el club o antes de un partido.

## Qué NO es

- No es una app multi-federación: de momento solo soporta el scraping del formato de la Federación Canaria de Pádel.
- No gestiona resultados de partidos, clasificaciones de liga ni calendario de jornadas.
- No sustituye la web oficial de la federación; solo lee y visualiza sus datos públicos de forma más cómoda.
- No permite editar manualmente los datos de los jugadores (nombre, puntos, edad): esos datos son de solo lectura, tal cual llegan del scraping.

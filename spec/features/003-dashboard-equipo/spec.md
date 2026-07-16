# 003 · Dashboard de equipo

**Estado:** implementado ✅

## Qué hace

Una vez el usuario tiene sesión y equipo vinculado (features 001 y 002), ve un dashboard con: el nombre de su equipo, la liga/categoría y el nombre del capitán en una cabecera, y debajo un listado con todos los jugadores del equipo (nombre completo, puntos, edad y número de licencia), con buscador por nombre y opción de ordenar por puntos, edad o nombre.

## Por qué

Es la vista principal de consulta del equipo: permite a cualquier jugador o al capitán ver de un vistazo quién compone el equipo y sus puntos oficiales, sin entrar a la web de la federación.

## Criterios de aceptación

- [ ] La cabecera muestra el nombre del equipo, la liga, la categoría y el nombre del capitán obtenidos del equipo vinculado al usuario autenticado.
- [ ] El listado muestra todos los jugadores devueltos por el scraping de ese equipo (nombre, puntos, edad, licencia).
- [ ] El buscador filtra el listado por nombre en tiempo real.
- [ ] El selector de orden reordena el listado por puntos (por defecto), edad o nombre.
- [ ] Mientras se cargan los datos se muestra un estado de carga (skeletons), no una pantalla vacía o rota.
- [ ] Si el scraping falla, se muestra un mensaje de error en español explicando que no se pudieron obtener los datos, sin romper el resto de la app.
- [ ] El dashboard usa los datos del equipo vinculado al usuario que ha iniciado sesión (feature 002), no un equipo fijo para todos los usuarios.

## Fuera de alcance

- Edición manual de cualquier dato de jugador o equipo (ver `mission.md`: los datos son de solo lectura).
- Históricos o comparativas entre jornadas/temporadas.
- Filtros avanzados más allá de búsqueda por nombre y los tres criterios de orden indicados.

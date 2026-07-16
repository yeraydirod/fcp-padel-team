# 001 · Login con Google (Firebase)

**Estado:** implementado ✅

## Qué hace

Permite a un usuario iniciar sesión en la app usando su cuenta de Google. Al entrar sin sesión, ve una pantalla de login con un botón "Continuar con Google"; tras autenticarse, la app recuerda su sesión en visitas siguientes hasta que cierre sesión explícitamente. También ofrece un botón de "Cerrar sesión" una vez autenticado.

## Por qué

Es el punto de entrada de toda la app: sin identificar al usuario no se puede saber qué equipo de la federación le corresponde (feature 002) ni mostrarle su dashboard (feature 003). Usar Google vía Firebase evita construir y mantener un sistema de contraseñas propio.

## Criterios de aceptación

- [ ] Un usuario sin sesión que visita la app ve una pantalla de login con un botón "Continuar con Google", sin poder ver el dashboard ni el simulador.
- [ ] Al pulsar el botón y completar el flujo de Google, el usuario queda autenticado y es redirigido fuera de la pantalla de login.
- [ ] Si el usuario recarga la página o vuelve más tarde con la misma sesión de navegador, sigue autenticado (no se le pide login de nuevo).
- [ ] Existe una acción visible de "Cerrar sesión" que, al usarse, vuelve a mostrar la pantalla de login.
- [ ] Si el login con Google falla o el usuario lo cancela, se muestra un mensaje de error claro en español y se permite reintentar.
- [ ] Ninguna ruta/página con datos del equipo es accesible sin sesión activa (redirige a login).

## Fuera de alcance

- Otros proveedores de login (email/contraseña, Apple, magic links, etc.) — no se contemplan por ahora.
- Roles o permisos distintos entre jugadores y capitán: cualquier usuario autenticado tiene el mismo acceso.
- Recuperación de cuenta o gestión de perfil más allá de lo que ya da Google/Firebase.

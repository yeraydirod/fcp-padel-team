# 002 · Onboarding: vincular link de equipo

**Estado:** implementado ✅

## Qué hace

Tras iniciar sesión por primera vez (feature 001), si el usuario todavía no tiene un equipo vinculado, la app le muestra un formulario para pegar el link de su equipo en la Federación Canaria de Pádel (por ejemplo, el enlace de la página "Ligas_Equipo" de su equipo). Al guardarlo, ese link queda asociado a su cuenta y se usa a partir de entonces para cargar los datos del equipo (dashboard y simulador). El usuario puede volver a este formulario más adelante para cambiar el link si se equivocó o cambia de equipo.

## Por qué

Hoy la URL de la federación está fija en el código (`FEDERATION_URL` en `lib/scrape.ts`), por lo que todos los usuarios verían el mismo equipo. Esta feature permite que cada usuario vea los datos de su propio equipo, que es imprescindible para que el dashboard (003) y el simulador (004) tengan sentido con más de un equipo/usuario.

## Criterios de aceptación

- [ ] Un usuario autenticado sin equipo vinculado ve el formulario de onboarding antes de poder acceder al dashboard o al simulador.
- [ ] El formulario acepta pegar una URL y valida que tiene forma de URL válida antes de intentar guardarla.
- [ ] Si la URL no es válida (formato incorrecto o no corresponde a una página de equipo de la federación), se muestra un error claro sin guardar nada.
- [ ] Al guardar una URL válida, queda asociada al usuario (Firestore) y la app navega directamente al dashboard con los datos de ese equipo.
- [ ] En sesiones futuras, un usuario que ya vinculó su equipo no vuelve a ver el formulario de onboarding; va directo al dashboard.
- [ ] Existe una forma de acceder de nuevo al formulario para cambiar el link vinculado (p. ej. desde un ajuste/opción visible en la UI).
- [ ] Si el scraping de la URL guardada falla (equipo no encontrado, federación caída), se informa al usuario con opción de revisar/cambiar el link.

## Fuera de alcance

- Vincular más de un equipo por usuario o cambiar de equipo "sobre la marcha" sin pasar por el formulario de edición.
- Autocompletar o sugerir el link (p. ej. buscando por nombre de equipo): el usuario siempre lo pega manualmente.
- Validar en profundidad que la URL pertenece a la Federación Canaria de Pádel más allá de comprobar que el scraping devuelve datos coherentes.

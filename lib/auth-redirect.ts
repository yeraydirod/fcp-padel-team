import { getRedirectResult, type Auth, type UserCredential } from 'firebase/auth'

let redirectResultPromise: Promise<UserCredential | null> | null = null

/**
 * getRedirectResult solo puede consumirse una vez por carga de página.
 * React Strict Mode y Fast Refresh montan el efecto dos veces en dev;
 * sin esto, la segunda llamada devuelve null y parece que el login falló.
 */
export function getRedirectResultOnce(auth: Auth): Promise<UserCredential | null> {
  if (!redirectResultPromise) {
    redirectResultPromise = getRedirectResult(auth).catch((err) => {
      redirectResultPromise = null
      throw err
    })
  }
  return redirectResultPromise
}

# fcp-padel-team

App web (beta) para equipos de la [Federación Canaria de Pádel](https://www.padelcanarias.es/): login con Google, importación del listado oficial del equipo y simulador de parejas para una jornada.

Orientada a uso **mobile-first** (capitán / jugadores en el club).

## Estado

**Beta.** Features del MVP (login, onboarding, dashboard, simulador) y pulido UX están implementadas. Ver [`spec/`](spec/README.md) para la especificación y el roadmap.

## Stack

- Next.js 16 (App Router) + React 19
- Firebase Authentication (Google) + Firestore
- Scraping del HTML público de la federación (`cheerio`)
- Tailwind CSS + shadcn/ui
- Despliegue previsto en Vercel

## Setup local

Requisitos: Node.js 20+ y un proyecto Firebase (Auth Google + Firestore).

```bash
git clone https://github.com/yeraydirod/fcp-padel-team.git
cd fcp-padel-team
npm install
cp .env.example .env.local
# Rellena .env.local con tu config Firebase
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Variables de entorno

Copia [`.env.example`](.env.example). Necesitas:

**Cliente (públicas):**

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

**Servidor (API `/api/team`):**

- `FIREBASE_ADMIN_PROJECT_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY` (con `\n` escapados en una sola línea)

No subas `.env` ni `.env.local` al repositorio.

### Firebase

1. Authentication → proveedor **Google** habilitado.
2. Firestore creado.
3. Publica las reglas de [`firestore.rules`](firestore.rules) en la consola (o CLI).
4. En producción, añade el dominio de Vercel en Authentication → Settings → **Authorized domains**.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servir el build |
| `npm run lint` | ESLint |

## Spec Driven Development

La carpeta [`spec/`](spec/README.md) define misión, stack, roadmap y cada feature (`spec.md` / `plan.md` / `tasks.md`). Antes de cambiar comportamiento, lee la spec correspondiente.

## Deploy (Vercel)

1. Importa este repo en Vercel (framework Next.js).
2. Configura las mismas variables que en `.env.example` (Production y Preview).
3. Despliega y añade el dominio `*.vercel.app` a los authorized domains de Firebase.
4. Smoke test: login → vincular URL de equipo → roster → simulador.

## Licencia

Proyecto privado de uso del equipo. Datos de jugadores de solo lectura desde la federación.

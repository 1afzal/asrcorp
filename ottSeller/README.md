# Softwaresellr

**Premium Software. Honest Prices.**
Genuine subscriptions for the tools you love — activated and delivered fast.

A production-ready React + TypeScript + Stripe storefront for reselling software subscriptions.

## Stack

- **Client:** React 18, TypeScript, Vite, React Router v6, Tailwind CSS, Stripe.js, Framer Motion, Zod, Lucide, react-hot-toast, Axios
- **Server:** Express, TypeScript, Stripe SDK, Zod, CORS

## Project Layout

```
.
├── client/                 # Vite app (port 5173)
├── server/                 # Express API (port 3001)
├── .env.example
└── package.json            # Root orchestration scripts
```

## Setup

Install both workspaces:

```bash
npm run install:all
```

Copy env templates:

```bash
cp .env.example client/.env
cp .env.example server/.env
# Fill in Stripe keys in both files
```

## Development

Run the client and server in two terminals:

```bash
npm run dev:server   # http://localhost:3001
npm run dev:client   # http://localhost:5173
```

## Stripe Setup

1. Create an account at https://dashboard.stripe.com
2. Copy your **Publishable key** into `client/.env` as `VITE_STRIPE_PUBLISHABLE_KEY`
3. Copy your **Secret key** into `server/.env` as `STRIPE_SECRET_KEY`
4. For the webhook, install the Stripe CLI and forward events:
   ```bash
   stripe listen --forward-to http://localhost:3001/api/webhook/stripe
   ```
   The CLI prints a `whsec_...` secret — paste it into `server/.env` as `STRIPE_WEBHOOK_SECRET`.

Test card: `4242 4242 4242 4242`, any future expiry, any CVC.

## API

### `POST /api/payment/create-intent`

```json
{
  "productId": "3",
  "customerEmail": "jane@example.com",
  "customerName": "Jane Doe",
  "amountINR": 2000
}
```

Returns `{ "clientSecret": "pi_..._secret_..." }`.

### `POST /api/webhook/stripe`

Stripe → server. Logs `payment_intent.succeeded` / `payment_intent.payment_failed` events to `server/orders.json`.

## Deployment (Vercel)

The app deploys as **two separate Vercel projects** pointing at the same Git repo with different root directories.

### 1. Deploy the server

1. In Vercel → **Add New… → Project**, import this repo.
2. Set **Root Directory** to `server`.
3. Framework Preset: **Other** (Vercel auto-detects the `api/` folder).
4. Add Environment Variables (Production + Preview):

   | Name             | Value                                                            |
   | ---------------- | ---------------------------------------------------------------- |
   | `MONGODB_URI`    | Your MongoDB Atlas connection string                             |
   | `ADMIN_EMAIL`    | Admin login email                                                |
   | `ADMIN_PASSWORD` | Admin login password                                             |
   | `JWT_SECRET`     | 48+ byte random string (`node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"`) |
   | `ALLOWED_ORIGIN` | The client's deployed URL — set after step 2 (e.g. `https://softwaresellr.vercel.app`) |
   | `NODE_ENV`       | `production`                                                     |

5. Deploy. Note the resulting URL — e.g. `https://softwaresellr-api.vercel.app`. Verify `<that-url>/api/health` returns `{"status":"ok"}`.

All requests are rewritten to a single serverless function ([server/api/index.ts](server/api/index.ts)) that boots the Express app and caches the Mongo connection across warm invocations.

### 2. Deploy the client

1. Vercel → **Add New… → Project**, import the same repo again.
2. Set **Root Directory** to `client`.
3. Framework Preset: **Vite** (auto-detected).
4. Add Environment Variable: `VITE_API_BASE_URL` = the server URL from step 1.
5. Deploy.

### 3. Wire them together

Once the client URL is known:

- Go back to the **server** project → **Settings → Environment Variables** → set `ALLOWED_ORIGIN` to the client URL → **Redeploy**.

### Notes

- The `express-rate-limit` admin-login limiter is in-memory and per-instance, so it's only loosely enforced across serverless cold starts. A strong `ADMIN_PASSWORD` is your primary defence.
- `/sitemap.xml` and `/robots.txt` are served from the **server** URL. Submit that URL to Search Console, or add a rewrite in [client/vercel.json](client/vercel.json) to alias them onto the client domain.
- MongoDB is seeded automatically from [server/src/seed-data.json](server/src/seed-data.json) on the first cold start when the collection is empty. Subsequent boots skip seeding.

## Disclaimer

Softwaresellr is an independent reseller and is not affiliated with any of the listed software brands.

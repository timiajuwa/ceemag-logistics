# Ceemag Logistics

Marketing site for **Ceemag Logistics** (inspired by [godba.com](https://godba.com/), content from [ceemag.ca](https://ceemag.ca/)).

## Local development

```bash
cd ~/ceemag-logistics
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) · Quote form at `/quote`.

### Logistics images

Photos are curated Unsplash logistics shots (containers, trucks, air cargo, etc.). On Vercel they load automatically via Next.js Image Optimization.

To **bundle images in the repo** (faster, no external CDN):

```bash
npm run images
```

Then in `.env.local`:

```
NEXT_PUBLIC_USE_LOCAL_IMAGES=true
```

Commit the files under `public/images/` if you want them on Vercel too (recommended for production).

Replace any stock photo with your own Ceemag images by overwriting files in `public/images/` (keep the same filenames) or updating `lib/images.ts`.

## Deploy to Vercel

### Option A — Vercel website (easiest)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add environment variables (optional):

   | Variable | Purpose |
   |----------|---------|
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp on quote page, e.g. `19054632764` |
   | `N8N_WEBHOOK_URL` | Webhook for quote form submissions |
   | `NEXT_PUBLIC_USE_LOCAL_IMAGES` | `true` if you committed `public/images/*.jpg` |

5. Deploy.

### Option B — Vercel CLI

```bash
cd ~/ceemag-logistics
npm install -g vercel   # once
vercel login            # once
vercel                  # first deploy (follow prompts)
vercel --prod           # production URL
```

### After deploy

- Production URL will look like `https://ceemag-logistics.vercel.app` (or your custom domain).
- In the Vercel dashboard: **Settings → Environment Variables** for secrets above.
- For a custom domain: **Settings → Domains** (e.g. `demo.ceemag.ca`).

## Project structure

- `app/` — Next.js pages (`/`, `/quote`, `/dashboard`)
- `components/marketing/` — Homepage sections
- `lib/images.ts` — Image URLs and local paths
- `public/images/` — Cached photos after `npm run images`

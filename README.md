# Kaski Logging — Standalone Website

Complete, self-contained website for **Kaski Logging Inc.** — Pacific Northwest timber harvesting company based in Amboy, WA.

## URLs

- **Production**: https://kaskilogging.com
- **WWW**: https://www.kaskilogging.com
- **Cloudflare Pages**: https://kaski-logging.pages.dev

## Quick Start (Genspark AI Developer)

```bash
# 1. Install dependencies
cd /home/user/webapp && npm install

# 2. Build
npm run build

# 3. Apply D1 migrations locally
npx wrangler d1 migrations apply kaski_logging --local

# 4. Start dev server (with D1)
pm2 start ecosystem.config.cjs

# 5. Test
curl http://localhost:3000
curl -s -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"first_name":"Test","last_name":"User"}'
```

## Deploy to Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy dist --project-name kaski-logging
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/contact` | Submit contact form (first_name, last_name, phone, email, service_needed, acreage, details) |
| `GET` | `/api/submissions` | List all contact submissions (admin) |
| `GET` | `/api/submissions/:id` | Get single submission |
| `PATCH` | `/api/submissions/:id/status` | Update submission status (new, contacted, scheduled, completed, archived) |
| `POST` | `/api/submissions/:id/notes` | Add a note to a submission |
| `GET` | `/api/submissions/:id/notes` | Get notes for a submission |
| `POST` | `/api/pageview` | Track a page view (path, referrer) |
| `GET` | `/api/stats` | Basic analytics (total views, today views, submission counts) |

All `/api/submissions*` endpoints require the `ADMIN_KEY` secret (`Authorization: Bearer <key>` header or `?key=<key>` query param) — they expose customer PII. The production key lives in `.admin-key.local` (gitignored) and as a Cloudflare Pages secret; rotate with `npx wrangler pages secret put ADMIN_KEY --project-name kaski-logging`. For local dev, put `ADMIN_KEY=...` in `.dev.vars`.

## Data Architecture

- **Database**: Cloudflare D1 (`kaski_logging` — ID: `169375ab-c351-42d5-8182-6bf8e3c116a9`)
- **Tables**:
  - `contact_submissions` — Form submissions with status tracking
  - `page_views` — Analytics / page view tracking
  - `submission_notes` — Admin notes on submissions
- **Binding**: `DB` in wrangler.jsonc

## Project Structure

```
webapp/
├── src/
│   └── index.tsx              # Complete Hono app with HTML + API routes
├── migrations/
│   └── 0001_initial_schema.sql # D1 database schema
├── public/
│   └── static/
│       └── logging/           # All image assets (10 files)
│           ├── hero-fog-hills.jpg
│           ├── logo-nav.png
│           ├── logo-white.png
│           ├── logo.png
│           ├── real-cable-yarder.jpg
│           ├── real-cat-loader-mountain.jpg
│           ├── real-clearcut-hillside.jpg
│           ├── real-loaded-truck.jpg
│           ├── real-log-yard.jpg
│           └── real-sunset-loaders.jpg
├── package.json
├── vite.config.ts
├── tsconfig.json
├── wrangler.jsonc
├── ecosystem.config.cjs
└── .gitignore
```

## Website Sections (10 sections)

1. **Hero** — Full-screen foggy mountain hero with stat cards (40+ years, 500+ projects, 0 safety incidents, 24/7 emergency)
2. **Trust Bar** — Licensed, OSHA, Sustainable, WA L&I, Full Fleet, DNR Approved
3. **Services (6)** — Selective Logging, Clear-Cut, Road Building, Cable Yarding, Land Clearing, Timber Cruising
4. **Project Gallery (5)** — McCannon, Cedar Creek, Lookout, Yacolt Burn, Gifford Pinchot
5. **Equipment Fleet (6)** — Feller Bunchers, Cable Yarders, Log Loaders, Log Trucks, Skidders, Processors
6. **Process (6 steps)** — Assessment > Permitting > Roads > Harvesting > Processing > Restoration
7. **About/Story** — Three generations, founded 1985, crew stats
8. **Team (3)** — Leif Kaski (Owner), Jake Abernathy (Foreman), Mike Proctor (Head Faller)
9. **Reviews (6)** — Landowners, DNR, developers, ranchers
10. **Contact** — Full form (saves to D1) + phone/email/address/hours + FAQ (7 questions)

## Business Details

- **Company**: Kaski Logging, Inc.
- **Phone**: (360) 247-5402
- **Email**: office@kaskilogging.com
- **Address**: 22411 NE Cedar Creek Rd, Amboy, WA 98601
- **License**: WA Contractor License #KASKIL*835LJ | UBI 602-806-754
- **Colors**: Forest Green (#1b3a1a) + Timber Gold (#c8a45e)
- **Fonts**: Oswald (headings) + Inter (body)

## Tech Stack

- **Framework**: Hono (Cloudflare Pages)
- **Database**: Cloudflare D1 (SQLite)
- **CSS**: Tailwind CSS (CDN)
- **Icons**: Font Awesome 6.4 (CDN)
- **Animations**: Intersection Observer AOS, CSS transitions
- **Deploy**: Cloudflare Pages / Workers
- **Domain**: kaskilogging.com (Cloudflare DNS)

## Deployment

- **Platform**: Cloudflare Pages
- **Status**: Active
- **Custom Domains**: kaskilogging.com, www.kaskilogging.com
- **D1 Database**: kaski_logging (production, migrations applied)
- **Last Updated**: 2026-04-10

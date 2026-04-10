# Kaski Logging — Standalone Website

Complete, self-contained website for **Kaski Logging Inc.** — Pacific Northwest timber harvesting company based in Amboy, WA.

## Quick Start (Genspark AI Developer)

```bash
# 1. Install dependencies
cd /home/user/webapp && npm install

# 2. Build
npm run build

# 3. Start dev server
pm2 start ecosystem.config.cjs

# 4. Test
curl http://localhost:3000
```

## Deploy to Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy dist --project-name kaski-logging
```

## Project Structure

```
kaski-logging-standalone/
├── src/
│   └── index.tsx          # Complete Hono app with full HTML
├── public/
│   └── static/
│       └── logging/       # All image assets (10 files)
│           ├── hero-fog-hills.jpg      # Hero: foggy mountain valley
│           ├── logo-nav.png            # Nav logo (76x44)
│           ├── logo-white.png          # White logo for dark sections
│           ├── logo.png                # Full color logo
│           ├── real-cable-yarder.jpg   # Cable yarding operation
│           ├── real-cat-loader-mountain.jpg  # CAT loader at Mt. St. Helens
│           ├── real-clearcut-hillside.jpg    # Aerial clear-cut view
│           ├── real-loaded-truck.jpg         # Loaded log truck
│           ├── real-log-yard.jpg             # Log yard with CAT machines
│           └── real-sunset-loaders.jpg       # Sunset with loaders
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
6. **Process (6 steps)** — Assessment → Permitting → Roads → Harvesting → Processing → Restoration
7. **About/Story** — Three generations, founded 1985, crew stats
8. **Team (3)** — Leif Kaski (Owner), Jake Abernathy (Foreman), Mike Proctor (Head Faller)
9. **Reviews (6)** — Landowners, DNR, developers, ranchers
10. **Contact** — Full form + phone/email/address/hours + FAQ (7 questions)

## Business Details

- **Company**: Kaski Logging, Inc.
- **Phone**: (360) 903-5144
- **Email**: info@kaskilogging.com
- **Address**: 22411 NE Cedar Creek Rd, Amboy, WA 98601
- **License**: WA Contractor License #KASKIL*835LJ | UBI 602-806-754
- **Colors**: Forest Green (#1b3a1a) + Timber Gold (#c8a45e)
- **Fonts**: Oswald (headings) + Inter (body)

## Tech Stack

- **Framework**: Hono (Cloudflare Pages)
- **CSS**: Tailwind CSS (CDN)
- **Icons**: Font Awesome 6.4 (CDN)
- **Animations**: Intersection Observer AOS, CSS transitions
- **Deploy**: Cloudflare Pages / Workers

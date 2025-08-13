## Weather App (Next.js + Node API)

Modern weather app using Next.js App Router and a Node API route to securely fetch OpenWeather data. Styled with Tailwind (v4) and glassmorphism + subtle animations.

### Features

- Secure server API: `src/app/api/weather/route.ts` proxies OpenWeather (no key in client)
- Current weather and next 24h forecast (8 x 3h blocks)
- Enhanced UI (glassmorphism, animated gradient, floating accents)
- City search with loading states and error handling

### Tech Stack

- Next.js 15 (App Router)
- React 19
- Node API route (Edge-compatible fetch)
- Tailwind CSS 4

### Getting Started

1. Install dependencies

```bash
cd weather-next
npm install
```

2. Configure environment
   Create `.env.local` in `weather-next/`:

```bash
OPENWEATHER_API_KEY=YOUR_OPENWEATHER_KEY
```

3. Run the development server

```bash
npm run dev
# open http://localhost:3000
```

### Project Structure

```
weather-next/
  src/app/
    api/weather/route.ts   # Server API that fetches current + forecast
    page.tsx               # Client UI (search, current, hourly)
    layout.tsx             # Root layout and fonts
    globals.css            # Tailwind + custom keyframes
```

### API Details

- GET `/api/weather?city={CITY}`
- Returns `{ current, forecast }` where `forecast.list` is the 3‑hourly array
- Uses `units=metric` (°C); wind shown in km/h (converted from m/s)

### Build & Run (Production)

```bash
npm run build
npm run start
# open http://localhost:3000
```

### Deployment

- Vercel recommended. Set `OPENWEATHER_API_KEY` in project environment variables.
- No additional configuration is required.

### Customization

- Colors are set in `src/app/page.tsx` using your palette: `#F3E2D4`, `#C5B0CD`, `#415E72`, `#17313E`.
- Animations are defined in `src/app/globals.css` (`float`, `gradientShift`, `sheen`).

### Notes

- If you see hydration warnings in dev, test in a private window or disable extensions. Root layout suppresses extension-induced diffs.

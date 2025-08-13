# Weather App – Next.js + OpenWeather

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

> A modern weather application built with Next.js (App Router) and a Node API route that securely fetches data from OpenWeather. Features a polished UI with glassmorphism, animated gradients, and hourly forecast tiles.

## Preview

Add a screenshot at `weather-next/public/preview.png` and it will show here:

```weather-next/public/preview.png
// ... add your preview image here ...
```

If you deploy, add a link to your live demo here: [Live Demo](https://example.com)

## Features

- Secure server API: `weather-next/src/app/api/weather/route.ts` proxies OpenWeather (your key never reaches the browser)
- Current conditions with icon, temperature, description, and quick stats (feels like, humidity, wind)
- Next 24 hours forecast (8 × 3-hour blocks)
- Refined UI: glassmorphism card, gradient background, subtle motion
- Tailwind CSS utility styling (v4)

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- Node API route using `fetch`

## Getting Started

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

## Project Structure

```
Weather-App/
  weather-next/
    src/app/
      api/weather/route.ts   # Server API that fetches current + forecast
      page.tsx               # Client UI (search, current, hourly)
      layout.tsx             # Root layout and fonts
      globals.css            # Tailwind + custom keyframes
    public/                  # Static assets (add preview.png here)
    package.json             # dev/build/start scripts
```

## API Details

- GET `/api/weather?city={CITY}`
- Response: `{ current, forecast }` where `forecast.list` is the 3‑hourly array
- Units are metric (°C). Wind shown in km/h (converted from m/s)

## Build & Run (Production)

```bash
npm run build
npm run start
# open http://localhost:3000
```

## Deployment

- Recommended: [Deploy on Vercel](https://vercel.com/new)
- Set `OPENWEATHER_API_KEY` as a Project Environment Variable in your host

## Customization

- Color palette is set in `page.tsx` using:
  - `#F3E2D4`, `#C5B0CD`, `#415E72`, `#17313E`
- Animations are defined in `globals.css` (`float`, `gradientShift`, `sheen`)

## Roadmap

- Geolocation-based default city
- Weekly forecast view
- Dark/light theme toggle
- Unit toggle (°C/°F)

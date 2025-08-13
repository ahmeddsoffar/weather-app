"use client";

import { useState } from "react";

type CurrentWeather = {
  name: string;
  main: { temp: number; feels_like?: number; humidity?: number };
  wind?: { speed?: number };
  weather: { description: string; icon: string }[];
};

type ForecastItem = {
  dt: number;
  main: { temp: number };
  weather: { description: string; icon: string }[];
};

export default function Home() {
  const [city, setCity] = useState("");
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getWeather() {
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }
    setLoading(true);
    setError(null);
    setCurrent(null);
    setForecast([]);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();
      if (!res.ok) {
        const message = data?.message || data?.error || "Failed to fetch";
        setError(message);
        return;
      }
      setCurrent(data.current as CurrentWeather);
      setForecast((data.forecast?.list || []) as ForecastItem[]);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const next8 = forecast.slice(0, 8);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[linear-gradient(135deg,#F3E2D4,#C5B0CD,#415E72,#17313E)] bg-[length:200%_200%] animate-[gradientShift_12s_ease_infinite]">
      {/* Animated decorative blobs using your palette */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#F3E2D4]/40 blur-3xl animate-[float_5s_ease-in-out_infinite]" />
        <div className="absolute bottom-8 right-10 h-80 w-80 rounded-full bg-[#C5B0CD]/35 blur-3xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 -translate-y-1/2 left-1/3 h-56 w-56 rounded-full bg-[#415E72]/35 blur-3xl animate-[float_7s_ease-in-out_infinite]" />
      </div>

      <div className="relative bg-white/15 max-w-[580px] w-full p-6 sm:p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl border border-white/25 text-white ring-1 ring-white/10 overflow-hidden">
        {/* Sheen highlight */}
        <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-[sheen_4s_linear_infinite]" />
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Weather
        </h1>
        <p className="text-white/85 text-sm sm:text-base">
          Search any city for current conditions and the next 24 hours.
        </p>

        {/* Search bar */}
        <div className="mt-6 flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50 select-none">
              🔍
            </span>
            <input
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full pl-9 pr-3 py-2 h-11 rounded-xl border border-white/50 bg-white/80 text-black placeholder:text-black/50 outline-none focus:border-white/80 focus:ring-2 focus:ring-white/40 transition"
            />
          </div>
          <button
            onClick={getWeather}
            disabled={loading}
            className="relative inline-flex items-center justify-center h-11 px-5 rounded-xl text-white disabled:opacity-60 transition active:scale-[.99] bg-gradient-to-r from-[#415E72] to-[#17313E] hover:from-[#C5B0CD] hover:to-[#415E72] shadow-md overflow-hidden"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white/50 border-t-white animate-spin" />
                Loading
              </span>
            ) : (
              "Search"
            )}
            {/* Button sheen */}
            <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-[sheen_3s_linear_infinite]" />
          </button>
        </div>

        {error && <p className="mt-4 text-red-200">{error}</p>}

        {current && (
          <div className="mt-6">
            <div className="flex flex-col items-center animate-[float_8s_ease-in-out_infinite]">
              <img
                src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
                alt={current.weather[0].description}
                className="w-[180px] h-[180px] mx-auto mb-0 drop-shadow"
              />
              <div className="text-[64px] leading-none -mt-5 font-semibold">
                {Math.round(current.main.temp)}°C
              </div>
              <div className="text-lg mt-1 text-white/90">
                <p className="font-medium">{current.name}</p>
                <p className="capitalize text-white/80">
                  {current.weather[0].description}
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="rounded-xl bg-white/10 border border-white/20 p-3 text-center transition hover:bg-white/15 hover:border-white/30">
                <div className="text-sm text-white/70">Feels like</div>
                <div className="text-xl font-semibold">
                  {current.main.feels_like !== undefined
                    ? Math.round(current.main.feels_like)
                    : "-"}
                  °
                </div>
              </div>
              <div className="rounded-xl bg-white/10 border border-white/20 p-3 text-center transition hover:bg-white/15 hover:border-white/30">
                <div className="text-sm text-white/70">Humidity</div>
                <div className="text-xl font-semibold">
                  {current.main.humidity !== undefined
                    ? current.main.humidity
                    : "-"}
                  %
                </div>
              </div>
              <div className="rounded-xl bg-white/10 border border-white/20 p-3 text-center">
                <div className="text-sm text-white/70">Wind</div>
                <div className="text-xl font-semibold">
                  {current.wind?.speed !== undefined
                    ? Math.round((current.wind.speed || 0) * 3.6)
                    : "-"}{" "}
                  km/h
                </div>
              </div>
            </div>
          </div>
        )}

        {next8.length > 0 && (
          <div className="mt-8">
            <div className="mb-3 text-left text-white/90 font-medium">
              Next 24 hours
            </div>
            <div className="flex overflow-x-auto whitespace-nowrap gap-3 pb-1">
              {next8.map((item) => {
                const date = new Date(item.dt * 1000);
                const hour = date.getHours().toString().padStart(2, "0");
                return (
                  <div
                    key={item.dt}
                    className="flex-none w-24 rounded-2xl bg-white/10 border border-white/20 p-3 text-center hover:bg-white/15 transition shadow-sm hover:shadow-md"
                  >
                    <div className="text-white/80 text-sm">{hour}:00</div>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt="Hourly Weather Icon"
                      className="w-[34px] h-[34px] mx-auto my-1 animate-[float_6s_ease-in-out_infinite]"
                    />
                    <div className="text-white font-semibold">
                      {Math.round(item.main.temp)}°
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

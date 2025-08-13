export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return Response.json({ error: "Missing city parameter" }, { status: 400 });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Server misconfiguration: missing OPENWEATHER_API_KEY" },
      { status: 500 }
    );
  }

  const base = "https://api.openweathermap.org/data/2.5";
  const currentUrl = `${base}/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;
  const forecastUrl = `${base}/forecast?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl, { cache: "no-store" }),
      fetch(forecastUrl, { cache: "no-store" }),
    ]);

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    if (currentRes.status !== 200) {
      return Response.json(current, { status: currentRes.status });
    }

    if (forecastRes.status !== 200) {
      return Response.json(forecast, { status: forecastRes.status });
    }

    return Response.json({ current, forecast });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch weather data", details: String(error) },
      { status: 500 }
    );
  }
}

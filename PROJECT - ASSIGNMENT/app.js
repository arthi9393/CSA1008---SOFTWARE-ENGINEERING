import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY; // set your own key as an env var — never commit it

// ---------------------------------------------------------------------------
// Weather data layer — Open-Meteo (free, no API key required)
// ---------------------------------------------------------------------------
async function geocode(locationName) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    locationName
  )}&count=1&language=en&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results || data.results.length === 0) return null;
  const r = data.results[0];
  return { name: r.name, admin1: r.admin1, country: r.country, lat: r.latitude, lon: r.longitude };
}

async function getForecast(lat, lon, days = 3) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,precipitation,wind_speed_10m,weather_code` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code` +
    `&timezone=auto&forecast_days=${Math.min(Math.max(days, 1), 7)}`;
  const res = await fetch(url);
  return res.json();
}

const WEATHER_CODES = {
  0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Fog", 48: "Depositing rime fog",
  51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
  61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
  71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow",
  80: "Rain showers", 81: "Moderate rain showers", 82: "Violent rain showers",
  95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Thunderstorm with heavy hail",
};

// Simplified IMD-style alert thresholds — tune these against real IMD categories
// (e.g. IMD "heavy rain" = 64.5-115.5mm/day, "very heavy" beyond that).
const ALERT_THRESHOLDS = { heavyRainMm: 64.5, highWindKmh: 62 };

function checkAlerts(daily) {
  const alerts = [];
  daily.time.forEach((date, i) => {
    if (daily.precipitation_sum[i] >= ALERT_THRESHOLDS.heavyRainMm) {
      alerts.push({ date, type: "Heavy Rainfall Warning", detail: `${daily.precipitation_sum[i]} mm expected` });
    }
    if (daily.wind_speed_10m_max[i] >= ALERT_THRESHOLDS.highWindKmh) {
      alerts.push({ date, type: "High Wind Warning", detail: `${daily.wind_speed_10m_max[i]} km/h expected` });
    }
  });
  return alerts;
}

// ---------------------------------------------------------------------------
// NLU layer — LLM if ANTHROPIC_API_KEY is set, otherwise a rule-based fallback
// so the whole pipeline still runs (and is testable) with zero API keys.
// ---------------------------------------------------------------------------
async function extractIntent(message) {
  if (ANTHROPIC_KEY) {
    const systemPrompt =
      `Extract intent from a weather-chatbot query. Reply ONLY with JSON, no other text: ` +
      `{"intent":"current|forecast|alert|history|unclear","location":"<place name or null>",` +
      `"days":<integer, default 3>,"language":"<ISO 639-1 code of the query's language>"}`;
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 200,
        system: systemPrompt,
        messages: [{ role: "user", content: message }],
      }),
    });
    const data = await res.json();
    try {
      const text = data.content.map((c) => c.text || "").join("");
      return JSON.parse(text.replace(/```json|```/g, "").trim());
    } catch (e) {
      return { intent: "unclear", location: null, days: 3, language: "en" };
    }
  }

  // ---- rule-based fallback (no key required) ----
  const lower = message.toLowerCase();
  const dayMatch = lower.match(/(\d+)[- ]day/);
  const days = dayMatch ? parseInt(dayMatch[1]) : 3;
  let intent = "current";
  if (/forecast|next|coming days?/.test(lower)) intent = "forecast";
  if (/alert|warning|cyclone|storm/.test(lower)) intent = "alert";
  if (/history|trend|past|years?/.test(lower)) intent = "history";
  const locMatch = message.match(/in ([a-zA-Z\s]+?)[\?\.]?$/i) || message.match(/for ([a-zA-Z\s]+?)[\?\.]?$/i);
  const TRAILING_NOISE = /\b(today|now|currently|right now|this week)\b/gi;
  const location = locMatch ? locMatch[1].replace(TRAILING_NOISE, "").trim() : null;
  return { intent, location, days, language: "en" };
}

// ---------------------------------------------------------------------------
// Chat endpoint — orchestrates NLU -> geocode -> forecast/alert -> reply
// ---------------------------------------------------------------------------
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "message is required" });

    const parsed = await extractIntent(message);

    if (!parsed.location) {
      return res.json({
        reply: "I couldn't spot a location in that — which city or district do you mean?",
        parsed,
      });
    }

    const geo = await geocode(parsed.location);
    if (!geo) {
      return res.json({
        reply: `I couldn't find a place called "${parsed.location}". Could you check the spelling, or try a nearby major city?`,
        parsed,
      });
    }

    const forecast = await getForecast(geo.lat, geo.lon, Math.max(parsed.days || 3, 3));
    const alerts = checkAlerts(forecast.daily);

    let reply;
    if (parsed.intent === "alert") {
      reply = alerts.length
        ? `⚠️ ${alerts.map((a) => `${a.type} on ${a.date}: ${a.detail}`).join("; ")}`
        : `No active weather alerts for ${geo.name} right now.`;
    } else if (parsed.intent === "forecast") {
      const n = Math.min(parsed.days || 3, forecast.daily.time.length);
      reply =
        `${n}-day forecast for ${geo.name}: ` +
        forecast.daily.time
          .slice(0, n)
          .map(
            (d, i) =>
              `${d}: ${WEATHER_CODES[forecast.daily.weather_code[i]] || ""}, ` +
              `${forecast.daily.temperature_2m_min[i]}–${forecast.daily.temperature_2m_max[i]}°C`
          )
          .join(" | ");
    } else if (parsed.intent === "history") {
      reply =
        `Historical/climate-trend lookup isn't wired to a real archive in this demo — ` +
        `plug in the IMD data portal or NASA POWER here for genuine 10-year trend answers.`;
    } else {
      const cw = forecast.current;
      reply = `Current weather in ${geo.name}: ${WEATHER_CODES[cw.weather_code] || ""}, ${cw.temperature_2m}°C, wind ${cw.wind_speed_10m} km/h.`;
    }

    res.json({ reply, parsed, geo, alerts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong handling that query.", detail: String(err) });
  }
});

app.get("/api/health", (_req, res) => res.json({ status: "ok", llmEnabled: Boolean(ANTHROPIC_KEY) }));

// This file only defines the app — it does NOT start a server.
// server.js (local dev) and netlify/functions/api.js (Netlify) both import
// this and decide separately how to run it.
export { app };

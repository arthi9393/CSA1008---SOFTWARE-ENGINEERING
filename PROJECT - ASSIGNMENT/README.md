# WeatherGPT — Backend + Chat UI (Step 7–9 of the implementation guide)

A working conversational weather backend + chat frontend. Uses:
- **Open-Meteo** for geocoding + forecast data — completely free, **no API key needed**.
- **Anthropic API** (optional) for intent/entity extraction and multilingual replies. If you don't set a key, it falls back to a rule-based parser so the app still runs end-to-end.

## 1. Run it locally

```bash
npm install
node server.js
```

Open **http://localhost:3000** in your browser — you'll see the chat UI.

To enable real NLU + multilingual replies, set your own Anthropic API key first:

```bash
export ANTHROPIC_API_KEY=sk-ant-...   # your own key, get one at console.anthropic.com
node server.js
```

Without the key, the app still works using simple keyword matching (see `extractIntent`'s fallback branch in `server.js`) — good enough for TC1/TC2/TC3/TC5 demos.

## 2. Test the 5 required scenarios (Section E.5)

With the server running, type these into the chat UI and screenshot each **full conversation**:

| Test | Type this |
|---|---|
| TC1 – Current weather | `What's the weather in Chennai today?` |
| TC2 – Forecast | `3-day forecast for Coimbatore` |
| TC3 – Alert | `any weather alerts in Chennai` — to force a positive alert for the screenshot, temporarily lower `ALERT_THRESHOLDS` in `server.js` (e.g. `heavyRainMm: 1`) so today's real rainfall trips it, take the screenshot, then set it back |
| TC4 – Multilingual | Ask the same question in Tamil/Hindi (needs `ANTHROPIC_API_KEY` set) |
| TC5 – Edge case | `wether in banglor` (misspelled) |

You can also test endpoints directly with curl/Postman before using the UI:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"3-day forecast for Coimbatore"}'
```

## 3. Deploy to Vercel (Step 12)

1. Push this folder to a GitHub repo.
2. Add a `vercel.json` (below) so Express runs as a serverless function, or simpler: use [Vercel's Node.js server support](https://vercel.com/docs/frameworks/backend/express) — Vercel now auto-detects Express apps, no config needed for basic cases.
3. In the Vercel dashboard → your project → **Settings → Environment Variables**, add `ANTHROPIC_API_KEY` (never commit it to GitHub).
4. Deploy. Visit the live `.vercel.app` URL, confirm the chat works, and screenshot it **with the address bar visible**.

## 4. What's still a placeholder (be upfront about this in your report)

- **History/climate-trend intent** returns a canned message — wire in the IMD data portal or NASA POWER API here for real 10-year trend answers (Section E.8 "known limitations" material).
- **Alert thresholds** are simplified round numbers, not the actual IMD categorical thresholds — cite the real IMD alert-terminology doc in E.10 and refine these.
- **No database yet** — this demo calls Open-Meteo live every time. Step 8 of the guide (Supabase/Atlas) adds caching and the `query_logs`/`alerts` tables from your ER diagram; wire it in by writing to the DB inside the `/api/chat` handler before responding.

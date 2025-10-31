# TechMate – AI Laptop & Desktop Troubleshooter

TechMate is a full‑stack web application that helps users diagnose common laptop/desktop issues and get step‑by‑step solutions. It includes:

- Modern, responsive landing page with Unsplash visuals
- Troubleshooting interface with symptom selection, results, and dark mode
- Express + SQLite backend with schema and seed scripts
- BotPenguin chatbot integration for natural language help

## Project Structure

```
TechMate/
  backend/
    package.json
    server.js
    db.js
    schema.sql
    seed.sql
    .env.example
  frontend/
    index.html        (Landing Page)
    app.html          (Troubleshooting UI)
    styles.css
    app.js
    assets/
      hero.jpg        (Unsplash hero via URL reference)
```

## Prerequisites

- Node.js 18+

## Backend Setup (Express + SQLite)

```
cd backend
npm install
```

Initialize database (creates `techmate.sqlite`):

```
npm run db:reset
```

Start the API server (http://localhost:4000):

```
npm start
```

## Frontend

Serve the `frontend` folder via any static server (or use the backend to serve statics later). During development, you can open the files directly in a browser or run a local static server:

```
# From project root
npx serve frontend -l 5173
```

Open:

- Landing page: http://localhost:5173/index.html
- App UI: http://localhost:5173/app.html

Update `frontend/app.js` `API_BASE_URL` if your backend runs on a different host/port.

## BotPenguin Integration

Replace the placeholder script in `frontend/index.html` and `frontend/app.html` with your BotPenguin widget snippet. Example placeholder:

```
<!-- BotPenguin Widget: Replace with your production snippet from BotPenguin dashboard -->
<script>
  // Example: window.botpenguinSettings = { botId: "YOUR_BOT_ID" };
  // Paste the official BotPenguin embed script below
</script>
```

BotPenguin should be configured to reference your troubleshooting content. You can expose a minimal API endpoint that the bot can call (e.g., `/api/diagnose`) or preload FAQ content.

## Unsplash Images

This project uses Unsplash for visuals. Update `index.html` hero/banner URLs with your preferred queries. Sample sources:

- `https://images.unsplash.com/photo-1518779578993-ec3579fee39f` (hardware close-up)
- `https://images.unsplash.com/photo-1517336714731-489689fd1ca8` (laptop workspace)

See `index.html` comments for crediting and replacement instructions.

## API

- `GET /api/symptoms` → list of symptoms
- `POST /api/diagnose` body: `{ symptomIds: number[] }` → probable problems with solutions

## Database Schema

- Symptoms(id, name, description)
- Problems(id, name, type [hardware/software], description)
- Solutions(id, problem_id, solution_steps)
- ProblemSymptoms(symptom_id, problem_id, likelihood)

See `backend/schema.sql` and `backend/seed.sql` for details.

## Environment

Copy `.env.example` to `.env` in `backend/` if needed. Defaults are provided and not strictly required for SQLite.

## Customization

- Add more symptoms/problems/solutions in `seed.sql`
- Adjust UI copy and styles in `frontend/styles.css`
- Extend API logic in `server.js`

## License

MIT



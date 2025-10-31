## TechMate – Next.js Troubleshooter AI

Full‑stack Next.js app that diagnoses laptop/desktop issues and provides step‑by‑step fixes. Features:

- Modern landing page with Unsplash imagery
- Troubleshooting UI with symptom selection, results, and dark mode
- SQLite database auto-initialized on first run (schema + seed)
- API routes (`/api/symptoms`, `/api/diagnose`)
- BotPenguin chatbot integration (widget embed)

### Prerequisites

- Node.js 18+

### Install & Run

```
npm install
npm run dev
```

Open http://localhost:3000

### Build & Start

```
npm run build
npm start
```

### Project Structure

```
app/
  layout.tsx
  globals.css
  page.tsx                 (Landing page)
  troubleshoot/page.tsx    (Troubleshooting UI)
  api/
    symptoms/route.ts
    diagnose/route.ts
components/
  ThemeToggle.tsx
lib/
  db.ts
  schema.sql
  seed.sql
techmate.sqlite            (auto-created on first run)
```

### BotPenguin Integration

Paste your BotPenguin embed snippet in `app/layout.tsx` where indicated. Example placeholder:

```html
<script>
  window.botpenguinSettings = { botId: 'YOUR_BOTPENGUIN_BOT_ID' };
  (function(){ var s=document.createElement('script'); s.src='https://cdn.botpenguin.com/widget.js'; s.async=true; document.body.appendChild(s); })();
</script>
```

### Unsplash Images

Update the hero image URL in `app/page.tsx` with your preferred Unsplash image.

### API

- GET `/api/symptoms` → list of symptoms
- POST `/api/diagnose` `{ symptomIds: number[] }` → problems with solutions

### Customization

- Add/modify data in `lib/seed.sql`
- Add schema columns in `lib/schema.sql` and adjust queries in API routes
- Tweak styles in `app/globals.css`




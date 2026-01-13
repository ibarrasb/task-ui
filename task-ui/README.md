# Task UI (UI-only)

Frontend-only Task Manager UI built with **React + Vite + Tailwind**.

This repo is **UI only** — the API is a separate repo/service.  
You run the UI locally against whatever API base URL you point it to, then build `dist/` and manually upload to **S3**.

---

## Tech
- React
- Vite
- Tailwind CSS
- Deployed as a static site on S3 ( behind CloudFront)

---

## Prereqs
- Node.js 18+ (20+ is fine)
- npm

---

## Install
```bash
npm install
```

---

## Run locally (dev)
```bash
npm run dev
```

Vite runs on:
- `http://localhost:5173`

---

## API base URL (important)
This UI calls the backend via your API client (example: `src/api/tasks.js`).

Make sure the API base URL is set correctly for:
- **local dev** (ex: `http://localhost:8080`)
- **prod** (ex: your hosted API URL)

### Recommended: use Vite env vars
Create `./.env.local`:
```bash
VITE_API_BASE_URL=http://localhost:8080
```

In your API client, reference it like:
```js
const API_BASE = import.meta.env.VITE_API_BASE_URL;
```

> If your API URL is hard-coded today, future-you tip: move it to `VITE_API_BASE_URL` so prod deploys don’t require code edits.

---

## Build for production
```bash
npm run build
```

Output folder:
- `dist/`

Optional: preview the production build locally
```bash
npm run preview
```

---

# Deploy to S3 (manual)

## 1) Create / configure the bucket
In AWS S3:
1. Create bucket (example: `task-ui-yourname`)
2. Enable **Static website hosting**
   - Index document: `index.html`
   - Error document: `index.html` (important for SPA routing)
3. Permissions (choose one):
   - **Recommended:** Use CloudFront in front of S3 (more secure)
   - **Simple:** make bucket public and add a public-read bucket policy

### SPA routing note (single-page app)
Because this is a SPA, you want **404s to fall back to `index.html`**:
- If using S3 website hosting only: set error document to `index.html`
- If using CloudFront: add custom error responses 403/404 -> `/index.html` (200)

---

## 2) Upload the dist output
Upload the **contents inside** `dist/` (not the folder itself):
- `index.html`
- `assets/…`

After upload, visit:
- the S3 **website endpoint** (or CloudFront URL if using it)

---

## 3) If using CloudFront: invalidate cache after each deploy
After uploading new files:
- Invalidate: `/index.html`
- If things look stale: invalidate `/*`

---

# “I haven’t touched this in months” checklist

## Local dev
```bash
npm install
npm run dev
```

## Deploy
```bash
npm run build
```
Then upload `dist/` contents to S3.  
If CloudFront: invalidate `/index.html` (or `/*`).

# Zeniva portfolio

This project is a clean-room reconstruction of the source shown in the uploaded 33-page PDF..

## Source structure reproduced

- Vite + React 18
- TypeScript
- Tailwind CSS
- `src/sections/AboutSection`
- `src/sections/ContactSection`
- `src/sections/HeroSection`
- `src/sections/Navbar`
- `src/sections/ProjectsSection`
- `src/sections/SkillsSection`
- `src/App.tsx`
- `src/index.tsx`
- Vite/Tailwind/TypeScript configuration

The PDF screenshots show some lines too small to read perfectly. Where exact source characters were not legible, the implementation preserves the visible component names, organization, content, dependencies, and behavior rather than inventing unrelated architecture.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build

```bash
npm run build
```

## Admin workspace

The admin workspace lets you add, edit, publish/unpublish, search, and delete
projects, and edit all supported portfolio site content. Changes are saved to
Postgres and appear on the public portfolio without a code change or redeploy.
Project and certification images/videos are stored in Vercel Blob.

### Vercel storage setup

1. In Vercel, add a Postgres database from the Storage/Marketplace integrations
   (Neon is the supported Postgres provider). Connect it to this project and
   make sure `POSTGRES_URL` is available in the target environment.
2. Open the database SQL editor and run
   [`db/migrations/001_portfolio.sql`](./db/migrations/001_portfolio.sql). This
   creates the tables and seeds the portfolio's four starter projects. Site
   content uses the built-in defaults until you save edits in the admin.
3. Create and connect a **public Vercel Blob store** to the project. Set
   `BLOB_READ_WRITE_TOKEN` for the deployment environment because the secure
   browser-upload route uses it to issue short-lived upload tokens.
4. In Vercel **Settings → Environment Variables**, set:
   - `ADMIN_EMAIL`: the email used to sign in to `/admin`.
   - `ADMIN_PASSWORD`: a long, unique admin password.
   - `ADMIN_SESSION_SECRET`: a randomly generated secret with at least 32
     random bytes (for example, generate one with `openssl rand -base64 32`).
5. Redeploy, then open `https://your-domain.vercel.app/admin`.

The database URL and Blob write token are only used by server-side Vercel
Functions; they are never included in the browser bundle. Admin sessions use a
signed, HTTP-only cookie and expire after eight hours. Public API reads return
published projects and portfolio site content only.

For local development, `npm run dev` starts only Vite. Use `vercel dev` after
linking the project and pulling its environment variables to run the API routes
as well. Do not commit the downloaded environment file.

Existing content saved in Supabase is not copied automatically. Export or copy
any custom project/site-content edits before switching, then enter them through
the new admin workspace after the Vercel database has been initialized.

## Notes

The original screenshots show project media loaded from generated assets. This reconstruction uses graceful placeholder media blocks so the project runs without requiring private/generated assets from the original environment.
madeby zenebu melaku
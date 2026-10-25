# Zeniva portfolio

This project is a clean-room reconstruction of the source shown in the uploaded 33-page PDF.

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

The admin uses Supabase for email/password authentication and shared project
storage. Once configured, open `/admin` on the deployed site (for example,
`https://your-domain.vercel.app/admin`) to add, edit, publish, unpublish, search,
and delete projects. Published projects are shown to all portfolio visitors.

### Supabase setup

1. Create a Supabase project.
2. In Supabase **SQL Editor**, run
   [`supabase/migrations/202610250001_portfolio_admin.sql`](./supabase/migrations/202610250001_portfolio_admin.sql).
   This creates the project and administrator tables, row-level security
   policies, and seeds the current portfolio projects.
3. In **Authentication → Users**, create your administrator user with the email
   and password you want to use to sign in. Do not enable public sign-ups.
4. Grant that user admin access by running this in SQL Editor, replacing the
   email with the one you just created:

   ```sql
   insert into public.portfolio_admins (user_id)
   select id from auth.users where email = 'you@example.com'
   on conflict (user_id) do nothing;
   ```

5. Copy `.env.example` to `.env.local` for local development and set
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project's
   **Settings → API** page. These are public client configuration values; never
   put a Supabase `service_role` key in the frontend or Vercel `VITE_` variables.
6. Add the same two environment variables in your Vercel project's
   **Settings → Environment Variables** for each environment you use, then
   redeploy so Vite includes them in the build.
7. Open `https://your-domain.vercel.app/admin` and sign in.

The admin and public portfolio are part of the same Vercel deployment. The
included [`vercel.json`](./vercel.json) rewrite makes direct navigation to
`/admin` load the React application. Admin access is enforced by Supabase Auth
and the database row-level security policies; only user IDs explicitly present
in `portfolio_admins` can create, update, or delete projects. Public visitors
can read published projects only.

If Supabase environment variables are not set, the public portfolio continues
to show the built-in projects, while `/admin` displays a setup notice. The
Supabase client uses only the public anon key; database access is restricted by
the SQL policies.

## Notes

The original screenshots show project media loaded from generated assets. This reconstruction uses graceful placeholder media blocks so the project runs without requiring private/generated assets from the original environment.

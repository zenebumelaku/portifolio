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

Open `/admin` on the deployed site (for example, `https://your-domain.vercel.app/admin`)
to add, edit, publish, unpublish, search, and delete projects.

### Deploying to Vercel

1. Push the code to the Git repository connected to your Vercel project.
2. Let Vercel build and deploy the updated commit.
3. Open your deployed domain with `/admin` appended.

The admin page is part of the same frontend deployment. It does not need a
separate Vercel project or a separate deployment. If the route does not load
after deployment, configure Vercel to rewrite application routes to `index.html`
so the React app can handle `/admin`.

### Important storage and security limitations

The current admin is a frontend-only demo: project changes are saved in
`localStorage` in the browser where you make them. They appear on the public
portfolio only in that same browser and on that same deployed origin. They do
not update the site's shared content for other visitors, carry over to another
browser/device, or persist if that browser's site data is cleared.

There is no sign-in, authorization, database, or server-side API. Anyone who
visits `/admin` can access its controls, and browser storage is not a secure
place for shared portfolio content. Before relying on admin edits in production,
add authenticated server-side storage and protect admin operations on the
server.

## Notes

The original screenshots show project media loaded from generated assets. This reconstruction uses graceful placeholder media blocks so the project runs without requiring private/generated assets from the original environment.

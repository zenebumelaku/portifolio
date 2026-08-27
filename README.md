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

## Notes

The original screenshots show project media loaded from generated assets. This reconstruction uses graceful placeholder media blocks so the project runs without requiring private/generated assets from the original environment.

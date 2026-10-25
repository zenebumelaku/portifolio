create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.portfolio_admins enable row level security;

drop policy if exists "Admins can read their own access record"
  on public.portfolio_admins;

create policy "Admins can read their own access record"
  on public.portfolio_admins
  for select
  to authenticated
  using (user_id = (select auth.uid()));

grant select on public.portfolio_admins to authenticated;

create table if not exists public.portfolio_projects (
  id text primary key,
  published boolean not null default false,
  project jsonb not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.portfolio_projects enable row level security;

drop policy if exists "Anyone can read published projects"
  on public.portfolio_projects;
drop policy if exists "Admins can read all projects"
  on public.portfolio_projects;
drop policy if exists "Admins can add projects"
  on public.portfolio_projects;
drop policy if exists "Admins can update projects"
  on public.portfolio_projects;
drop policy if exists "Admins can delete projects"
  on public.portfolio_projects;

create policy "Anyone can read published projects"
  on public.portfolio_projects
  for select
  to anon, authenticated
  using (published = true);

create policy "Admins can read all projects"
  on public.portfolio_projects
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.portfolio_admins
      where user_id = (select auth.uid())
    )
  );

create policy "Admins can add projects"
  on public.portfolio_projects
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.portfolio_admins
      where user_id = (select auth.uid())
    )
  );

create policy "Admins can update projects"
  on public.portfolio_projects
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.portfolio_admins
      where user_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
      from public.portfolio_admins
      where user_id = (select auth.uid())
    )
  );

create policy "Admins can delete projects"
  on public.portfolio_projects
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.portfolio_admins
      where user_id = (select auth.uid())
    )
  );

grant select on public.portfolio_projects to anon, authenticated;
grant insert, update, delete on public.portfolio_projects to authenticated;

insert into public.portfolio_projects (id, published, project, sort_order)
values
  (
    'zenebu-portfolio',
    true,
    '{
      "mediaType": "placeholder",
      "imageAlt": "Zenebu portfolio website",
      "category": "Web",
      "title": "Zenebu Portfolio",
      "description": "A modern developer portfolio showcasing full-stack, mobile, and AI-focused projects, skills, experience, and contact information.",
      "skills": ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      "live": "https://zenivaworks.vercel.app/#skills"
    }'::jsonb,
    0
  ),
  (
    'peachy-ecommerce',
    true,
    '{
      "mediaType": "image",
      "mediaSrc": "https://raw.githubusercontent.com/zenebumelaku/firebase_ecommerce/main/screenshots/screens.png",
      "imageAlt": "Peachy Ecommerce mobile app screens",
      "screenshots": [
        {"src": "https://raw.githubusercontent.com/zenebumelaku/firebase_ecommerce/main/screenshots/screens.png", "alt": "Peachy Ecommerce app overview"},
        {"src": "https://raw.githubusercontent.com/zenebumelaku/firebase_ecommerce/main/screenshots/home.png", "alt": "Peachy Ecommerce home screen"},
        {"src": "https://raw.githubusercontent.com/zenebumelaku/firebase_ecommerce/main/screenshots/detail_product.png", "alt": "Peachy Ecommerce product details screen"},
        {"src": "https://raw.githubusercontent.com/zenebumelaku/firebase_ecommerce/main/screenshots/cart.png", "alt": "Peachy Ecommerce cart screen"},
        {"src": "https://raw.githubusercontent.com/zenebumelaku/firebase_ecommerce/main/screenshots/profile.png", "alt": "Peachy Ecommerce profile screen"}
      ],
      "category": "Mobile",
      "title": "Peachy Ecommerce",
      "description": "A functional Flutter ecommerce app powered by Firebase, with clean architecture, BLoC state management, product discovery, checkout, order tracking, and customer messaging.",
      "skills": ["Flutter", "Dart", "Firebase", "Firestore", "BLoC", "Clean Architecture"],
      "github": "https://github.com/zenebumelaku/firebase_ecommerce"
    }'::jsonb,
    1
  ),
  (
    'rent-a-ride',
    true,
    '{
      "mediaType": "image",
      "mediaSrc": "https://github.com/user-attachments/assets/4b769f7d-5d2c-43a7-8283-07fa8402de92",
      "imageAlt": "Rent a Ride user booking interface",
      "screenshots": [
        {"src": "https://github.com/user-attachments/assets/4b769f7d-5d2c-43a7-8283-07fa8402de92", "alt": "Rent a Ride user module"},
        {"src": "https://github.com/user-attachments/assets/c08e3bf0-2776-4236-80b6-6714d52ec8d7", "alt": "Rent a Ride admin module"},
        {"src": "https://github.com/user-attachments/assets/59a9a9c7-5dc1-4f61-8d15-43266579386c", "alt": "Rent a Ride vendor module"}
      ],
      "category": "Full Stack",
      "title": "Rent a Ride",
      "description": "A full-stack car rental platform with user, admin, and vendor modules for browsing vehicles, managing listings, booking rides, and handling orders.",
      "skills": ["React", "Redux Toolkit", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Cloudinary", "JWT"],
      "live": "https://rent-ride-39el.vercel.app/",
      "github": "https://github.com/zenebumelaku/Rent_ride"
    }'::jsonb,
    2
  ),
  (
    'api-health-checker',
    true,
    '{
      "mediaType": "placeholder",
      "imageAlt": "API Health Checker service",
      "category": "Backend",
      "title": "API Health Checker",
      "description": "A lightweight Express service that checks configured APIs in parallel and reports HTTP status, response time, errors, and timestamps.",
      "skills": ["Node.js", "Express", "REST API", "Docker", "Postman"],
      "github": "https://github.com/zenebumelaku/api_health_checker"
    }'::jsonb,
    3
  )
on conflict (id) do nothing;

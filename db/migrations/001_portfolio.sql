CREATE TABLE IF NOT EXISTS portfolio_projects (
  id text PRIMARY KEY,
  published boolean NOT NULL DEFAULT false,
  project jsonb NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_site_content (
  id text PRIMARY KEY,
  content jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO portfolio_projects (id, published, project, sort_order)
VALUES
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
ON CONFLICT (id) DO NOTHING;

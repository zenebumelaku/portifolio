import { useEffect, useState } from "react";

export type PortfolioSiteContent = {
  hero: {
    eyebrow: string;
    headline: string;
    accentText: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    tertiaryCta: string;
    github: string;
    linkedin: string;
  };
  about: {
    heading: string;
    paragraphs: string[];
  };
  experience: {
    eyebrow: string;
    title: string;
    items: Array<{
      period: string;
      role: string;
      organization: string;
      location: string;
      description: string;
      highlights: string[];
    }>;
  };
  certifications: {
    eyebrow: string;
    title: string;
    items: Array<{
      name: string;
      issuer: string;
      date: string;
      credentialUrl: string;
    }>;
  };
  skills: {
    eyebrow: string;
    title: string;
    categories: Array<{
      title: string;
      skills: string[];
    }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    cards: Array<{
      title: string;
      value: string;
      href: string;
      iconLabel: string;
    }>;
    locationLabel: string;
    locationValue: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: Array<{
      quote: string;
      name: string;
      role: string;
      organization: string;
    }>;
  };
  footer: {
    name: string;
    tagline: string;
  };
};

export const defaultPortfolioSiteContent: PortfolioSiteContent = {
  hero: {
    eyebrow: "FULL-STACK DEVELOPER",
    headline: "ZENEBU MELAKU",
    accentText: "builds.",
    subtitle: "I build simple, useful web applications from front to back.",
    primaryCta: "Explore projects",
    secondaryCta: "GitHub",
    tertiaryCta: "LinkedIn",
    github: "https://github.com/zenebumelaku",
    linkedin: "https://www.linkedin.com/in/zenebu-melaku-7b9331225/",
  },
  about: {
    heading: "About Me",
    paragraphs: [
      "**I'm Zenebu Melaku**, a fourth-year **Software Engineering student** at Addis Ababa University and a **Full-Stack and Mobile Developer** who builds modern, scalable web and Flutter applications.",
      "I enjoy turning ideas into **practical digital products**, working across frontend, backend, APIs, databases, and system architecture. I'm also learning **AI engineering**, with a growing interest in machine learning, data, and intelligent applications.",
      "I'm focused on **continuous learning**, building **real-world projects**, and becoming a versatile software engineer.",
    ],
  },
  experience: {
    eyebrow: "Work experience",
    title: "Where I’ve contributed.",
    items: [],
  },
  certifications: {
    eyebrow: "Certifications",
    title: "Learning, recognized.",
    items: [],
  },
  skills: {
    eyebrow: "Toolbox",
    title: "My Skills",
    categories: [
      {
        title: "Programming Languages",
        skills: ["Python", "JavaScript", "TypeScript", "C++", "Java"],
      },
      {
        title: "Frontend & Mobile",
        skills: [
          "React",
          "Next.js",
          "HTML",
          "CSS",
          "Tailwind CSS",
          "Flutter",
          "Dart",
        ],
      },
      {
        title: "Backend & Systems",
        skills: ["Node.js", "Express.js", "REST APIs", "WebSockets", "Socket.IO"],
      },
      {
        title: "Database & Backend-as-a-Service",
        skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Mongoose", "Prisma"],
      },
      {
        title: "AI & Agentic Workflows",
        skills: [
          "NumPy",
          "Pandas",
          "Scikit-learn",
          "PyTorch",
          "TensorFlow",
          "Machine Learning",
          "Neural Networks",
          "LLMs",
          "AI Agents",
          "Generative AI",
        ],
      },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "What people say.",
    items: [],
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Contact Me",
    cards: [
      {
        title: "Email",
        value: "melakuzenebu3@gmail.com",
        href: "mailto:melakuzenebu3@gmail.com",
        iconLabel: "MAIL",
      },
      {
        title: "GitHub",
        value: "zenebumelaku",
        href: "https://github.com/zenebumelaku",
        iconLabel: "GH",
      },
      {
        title: "LinkedIn",
        value: "Zenebu Melaku",
        href: "https://www.linkedin.com/in/zenebu-melaku-7b9331225/",
        iconLabel: "IN",
      },
      {
        title: "Phone",
        value: "0945712016",
        href: "tel:0945712016",
        iconLabel: "TEL",
      },
      {
        title: "Telegram",
        value: "@teninen",
        href: "https://t.me/teninen",
        iconLabel: "TG",
      },
      {
        title: "LeetCode",
        value: "zeni_mel",
        href: "https://leetcode.com/zeni_mel",
        iconLabel: "LC",
      },
      {
        title: "Telegram channel",
        value: "@zenicore",
        href: "https://t.me/zenicore",
        iconLabel: "X",
      },
    ],
    locationLabel: "Location",
    locationValue: "Addis Ababa, Ethiopia",
  },
  footer: {
    name: "ZENEBU MELAKU",
    tagline: "Full-Stack Developer · Growing toward AI Engineering",
  },
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const asStringArray = (value: unknown, fallback: string[]) =>
  Array.isArray(value) && value.every((item) => typeof item === "string")
    ? (value as string[])
    : fallback;

const legacyAboutParagraphs = [
  "I'm Zenebu Melaku, a fourth-year Software Engineering student at Addis Ababa University and a Full-Stack and Mobile Developer who builds modern, scalable web and Flutter applications.",
  "I enjoy turning ideas into practical digital products, working across frontend, backend, APIs, databases, and system architecture. I'm also learning AI engineering, with a growing interest in machine learning, data, and intelligent applications.",
  "I'm focused on continuous learning, building real-world projects, and becoming a versatile software engineer.",
];

export const normalizePortfolioSiteContent = (
  value: unknown,
): PortfolioSiteContent => {
  const source = isRecord(value) ? value : {};
  const heroSource = isRecord(source.hero) ? source.hero : {};
  const aboutSource = isRecord(source.about) ? source.about : {};
  const experienceSource = isRecord(source.experience) ? source.experience : {};
  const certificationsSource = isRecord(source.certifications)
    ? source.certifications
    : {};
  const skillsSource = isRecord(source.skills) ? source.skills : {};
  const testimonialsSource = isRecord(source.testimonials)
    ? source.testimonials
    : {};
  const contactSource = isRecord(source.contact) ? source.contact : {};
  const footerSource = isRecord(source.footer) ? source.footer : {};

  const aboutParagraphs = asStringArray(
    aboutSource.paragraphs,
    defaultPortfolioSiteContent.about.paragraphs,
  );

  return {
    hero: {
      ...defaultPortfolioSiteContent.hero,
      ...heroSource,
      github:
        typeof heroSource.github === "string"
          ? heroSource.github
          : defaultPortfolioSiteContent.hero.github,
      linkedin:
        typeof heroSource.linkedin === "string"
          ? heroSource.linkedin
          : defaultPortfolioSiteContent.hero.linkedin,
    },
    about: {
      ...defaultPortfolioSiteContent.about,
      ...aboutSource,
      paragraphs: aboutParagraphs.map((paragraph) => {
        const legacyIndex = legacyAboutParagraphs.indexOf(paragraph);
        return legacyIndex < 0
          ? paragraph
          : defaultPortfolioSiteContent.about.paragraphs[legacyIndex];
      }),
    },
    experience: {
      ...defaultPortfolioSiteContent.experience,
      ...experienceSource,
      items: Array.isArray(experienceSource.items)
        ? experienceSource.items.flatMap((item) => {
            if (!isRecord(item)) return [];
            return [{
              period: typeof item.period === "string" ? item.period : "",
              role: typeof item.role === "string" ? item.role : "",
              organization:
                typeof item.organization === "string" ? item.organization : "",
              location: typeof item.location === "string" ? item.location : "",
              description:
                typeof item.description === "string" ? item.description : "",
              highlights: asStringArray(item.highlights, []),
            }];
          })
        : defaultPortfolioSiteContent.experience.items,
    },
    certifications: {
      ...defaultPortfolioSiteContent.certifications,
      ...certificationsSource,
      items: Array.isArray(certificationsSource.items)
        ? certificationsSource.items.flatMap((item) => {
            if (!isRecord(item)) return [];
            return [{
              name: typeof item.name === "string" ? item.name : "",
              issuer: typeof item.issuer === "string" ? item.issuer : "",
              date: typeof item.date === "string" ? item.date : "",
              credentialUrl:
                typeof item.credentialUrl === "string" ? item.credentialUrl : "",
            }];
          })
        : defaultPortfolioSiteContent.certifications.items,
    },
    skills: {
      ...defaultPortfolioSiteContent.skills,
      ...skillsSource,
      categories: Array.isArray(skillsSource.categories)
        ? (skillsSource.categories as unknown[]).map((item, index) => {
            const current = isRecord(item) ? item : {};
            const fallback =
              defaultPortfolioSiteContent.skills.categories[index] ??
              defaultPortfolioSiteContent.skills.categories[0];
            return {
              title:
                typeof current.title === "string" ? current.title : fallback.title,
              skills: asStringArray(current.skills, fallback.skills),
            };
          })
        : defaultPortfolioSiteContent.skills.categories,
    },
    testimonials: {
      ...defaultPortfolioSiteContent.testimonials,
      ...testimonialsSource,
      items: Array.isArray(testimonialsSource.items)
        ? testimonialsSource.items.flatMap((item) => {
            if (!isRecord(item)) return [];
            return [{
              quote: typeof item.quote === "string" ? item.quote : "",
              name: typeof item.name === "string" ? item.name : "",
              role: typeof item.role === "string" ? item.role : "",
              organization:
                typeof item.organization === "string" ? item.organization : "",
            }];
          })
        : defaultPortfolioSiteContent.testimonials.items,
    },
    contact: {
      ...defaultPortfolioSiteContent.contact,
      ...contactSource,
      cards: Array.isArray(contactSource.cards)
        ? (contactSource.cards as unknown[]).map((item, index) => {
            const current = isRecord(item) ? item : {};
            const fallback =
              defaultPortfolioSiteContent.contact.cards[index] ??
              defaultPortfolioSiteContent.contact.cards[0];
            return {
              title:
                typeof current.title === "string" ? current.title : fallback.title,
              value:
                typeof current.value === "string" ? current.value : fallback.value,
              href: typeof current.href === "string" ? current.href : fallback.href,
              iconLabel:
                typeof current.iconLabel === "string"
                  ? current.iconLabel
                  : fallback.iconLabel,
            };
          })
        : defaultPortfolioSiteContent.contact.cards,
      locationLabel:
        typeof contactSource.locationLabel === "string"
          ? contactSource.locationLabel
          : defaultPortfolioSiteContent.contact.locationLabel,
      locationValue:
        typeof contactSource.locationValue === "string"
          ? contactSource.locationValue
          : defaultPortfolioSiteContent.contact.locationValue,
    },
    footer: {
      ...defaultPortfolioSiteContent.footer,
      ...footerSource,
      name:
        typeof footerSource.name === "string"
          ? footerSource.name
          : defaultPortfolioSiteContent.footer.name,
      tagline:
        typeof footerSource.tagline === "string"
          ? footerSource.tagline
          : defaultPortfolioSiteContent.footer.tagline,
    },
  };
};

const readSiteContentRow = (data: unknown): PortfolioSiteContent => {
  if (!isRecord(data)) return defaultPortfolioSiteContent;
  return normalizePortfolioSiteContent(data);
};

export const loadPublicPortfolioContent = async (): Promise<PortfolioSiteContent> => {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return defaultPortfolioSiteContent;
  }

  const { supabase } = await import("@/data/supabase");
  if (!supabase) return defaultPortfolioSiteContent;

  const { data, error } = await supabase
    .from("portfolio_site_content")
    .select("content")
    .eq("id", "site")
    .maybeSingle();

  if (error) throw error;
  return readSiteContentRow(data?.content ?? defaultPortfolioSiteContent);
};

export const loadAdminPortfolioContent = async (): Promise<PortfolioSiteContent> => {
  const { supabase } = await import("@/data/supabase");
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from("portfolio_site_content")
    .select("content")
    .eq("id", "site")
    .maybeSingle();

  if (error) throw error;
  return readSiteContentRow(data?.content ?? defaultPortfolioSiteContent);
};

export const savePortfolioContent = async (content: PortfolioSiteContent) => {
  const { supabase } = await import("@/data/supabase");
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase.from("portfolio_site_content").upsert({
    id: "site",
    content,
  });

  if (error) throw error;
};

export const usePortfolioSiteContent = () => {
  const [content, setContent] = useState<PortfolioSiteContent>(defaultPortfolioSiteContent);

  useEffect(() => {
    let active = true;

    void loadPublicPortfolioContent()
      .then((nextContent) => {
        if (!active) return;
        setContent(nextContent);
      })
      .catch(() => {
        if (!active) return;
        setContent(defaultPortfolioSiteContent);
      });

    return () => {
      active = false;
    };
  }, []);

  return content;
};

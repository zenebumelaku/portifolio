import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react";

type DesktopNavbarProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

const links = [
  ["About", "#about"],
  ["Journey", "#journey"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

export const DesktopNavbar = ({
  darkMode,
  onToggleDarkMode,
}: DesktopNavbarProps) => {
  return (
    <div className="hidden items-center justify-between md:flex">
      <a
        href="#home"
        className="text-lg font-bold tracking-tight text-neutral-950 dark:text-white"
      >
        zenebu<span className="text-neutral-400">.dev</span>
      </a>

      <nav className="flex items-center gap-7">
        {links.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
          className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <a
          aria-label="GitHub"
          href="https://github.com/zenebumelaku"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
        >
          <Github size={17} />
        </a>
        <a
          aria-label="LinkedIn"
          href="https://www.linkedin.com/in/zenebu-melaku-7b9331225/"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
        >
          <Linkedin size={17} />
        </a>
        <a
          aria-label="Email"
          href="mailto:melakuzenebu3@gmail.com"
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
        >
          <Mail size={17} />
        </a>
      </div>
    </div>
  );
};

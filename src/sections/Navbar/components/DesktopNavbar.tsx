import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  ["About", "#about"],
  ["Journey", "#journey"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

export const DesktopNavbar = () => {
  return (
    <div className="hidden items-center justify-between md:flex">
      <a href="#home" className="text-lg font-bold tracking-tight">
        zenebu<span className="text-neutral-400">.dev</span>
      </a>

      <nav className="flex items-center gap-7">
        {links.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="text-sm font-medium text-neutral-600 hover:text-neutral-950"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <a
          aria-label="GitHub"
          href="https://github.com/zenebumelaku"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
        >
          <Github size={17} />
        </a>
        <a
          aria-label="LinkedIn"
          href="https://www.linkedin.com/in/zenebu-melaku-7b9331225/"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
        >
          <Linkedin size={17} />
        </a>
        <a
          aria-label="Email"
          href="mailto:melakuzenebu3@gmail.com"
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
        >
          <Mail size={17} />
        </a>
      </div>
    </div>
  );
};

import { Github, Linkedin, Send } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-sm font-semibold">ZENEBU MELAKU</p>
        <div className="flex items-center gap-4">
          <a
            aria-label="GitHub"
            href="https://github.com/zenebumelaku"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-500 hover:text-neutral-950"
          >
            <Github size={17} />
          </a>
          <a
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/zenebu-melaku-7b9331225/"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-500 hover:text-neutral-950"
          >
            <Linkedin size={17} />
          </a>
          <a
            aria-label="Telegram"
            href="https://t.me/teninen"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-500 hover:text-neutral-950"
          >
            <Send size={17} />
          </a>
        </div>
        <p className="text-xs text-neutral-500">
          Full-Stack Developer · Growing toward AI Engineering
        </p>
      </div>
    </footer>
  );
};

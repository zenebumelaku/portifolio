import { Github, Linkedin, Send } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          ZENEBU MELAKU
        </p>
        <div className="flex items-center gap-4">
          <a
            aria-label="GitHub"
            href="https://github.com/zenebumelaku"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            <Github size={17} />
          </a>
          <a
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/zenebu-melaku-7b9331225/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            <Linkedin size={17} />
          </a>
          <a
            aria-label="Telegram"
            href="https://t.me/teninen"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            <Send size={17} />
          </a>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Full-Stack Developer · Growing toward AI Engineering
        </p>
      </div>
    </footer>
  );
};

import { Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";

type MobileNavbarProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

export const MobileNavbar = ({
  darkMode,
  onToggleDarkMode,
}: MobileNavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between">
        <a
          href="#home"
          className="text-lg font-bold text-neutral-950 dark:text-white"
        >
          zenebu<span className="text-neutral-400">.dev</span>
        </a>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
            className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
            className="rounded-lg p-2 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <Menu size={21} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="mt-4 grid gap-1 border-t border-neutral-100 pt-3 dark:border-neutral-800">
          {["About", "Journey", "Skills", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
};

export default MobileNavbar;

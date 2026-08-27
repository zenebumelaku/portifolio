import { Menu } from "lucide-react";
import { useState } from "react";

export const MobileNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between">
        <a href="#home" className="text-lg font-bold">
          zenebu<span className="text-neutral-400">.dev</span>
        </a>
        <button
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          className="rounded-lg p-2 hover:bg-neutral-100"
        >
          <Menu size={21} />
        </button>
      </div>

      {open && (
        <nav className="mt-4 grid gap-1 border-t border-neutral-100 pt-3">
          {["About", "Journey", "Skills", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
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

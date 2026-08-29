import { DesktopNavbar } from "@/sections/Navbar/components/DesktopNavbar";
import MobileNavbar from "@/sections/Navbar/components/MobileNavbar";

type NavbarProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

export const Navbar = ({ darkMode, onToggleDarkMode }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 backdrop-blur transition-colors dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto w-full max-w-6xl px-5 py-4 md:px-8">
        <DesktopNavbar
          darkMode={darkMode}
          onToggleDarkMode={onToggleDarkMode}
        />
        <MobileNavbar darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      </div>
    </header>
  );
};

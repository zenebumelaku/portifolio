import { DesktopNavbar } from "@/sections/Navbar/components/DesktopNavbar";
import MobileNavbar from "@/sections/Navbar/components/MobileNavbar";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-5 py-4 md:px-8">
        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </header>
  );
};

import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import type { Theme } from "@/lib/useTheme";

const LINKS = [
  { href: "#works",     label: "Works"     },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#lab",       label: "Research"  },
  { href: "#contact",   label: "Contact"   },
];

export function Navbar({
  theme,
  onToggleTheme,
}: {
  theme: Theme;
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-concrete/85 dark:bg-dark-canvas/85 backdrop-blur-md border-b border-onyx/10 dark:border-concrete/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-display font-bold text-sm tracking-editorial uppercase text-onyx dark:text-concrete"
        >
          MUNΛRQ
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-[11px] tracking-editorial uppercase text-onyx/70 hover:text-moss dark:text-concrete/70 dark:hover:text-moss-bright transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-onyx/70 hover:text-moss dark:text-concrete/70 dark:hover:text-moss-bright transition-colors cursor-pointer"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="md:hidden p-2 text-onyx dark:text-concrete cursor-pointer"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-onyx/10 dark:border-concrete/10 bg-concrete dark:bg-dark-canvas">
          <nav className="px-6 py-6 flex flex-col gap-5">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-xs tracking-editorial uppercase text-onyx dark:text-concrete"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

import { useState, useCallback } from "react";
import { Menu, X, Zap } from "lucide-react";
import GradientButton from "@/components/GradientButton";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";
import logo from "/favicon.ico";

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Features", href: "#features" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((s) => !s), []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav
        className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="flex items-center gap-2 font-display font-bold text-lg"
          aria-label="C7 Corp home"
        >
          <img
            src="/favicon.ico" 
            alt="C7 Corp logo"
            className="w-7 h-7 rounded-md object-cover"
          />
          <span className="font-bold text-foreground tracking-tight">Corp</span>
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <GradientButton as="a" href="#contact" size="default">
            Get Early Access
          </GradientButton>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={toggle}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-t border-border/60 bg-background/95 backdrop-blur-xl",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <ul className="flex flex-col p-4 gap-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={toggle}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <GradientButton
              as="a"
              href="#contact"
              className="w-full"
              onClick={toggle}
            >
              Get Early Access
            </GradientButton>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const routes = [
    { href: "/", label: "Kreu" },
    { href: "/services", label: "Shërbimet" },
    { href: "/products", label: "Produktet" },
    { href: "/booking", label: "Rezervo Tani" },
  ];

  return (
    <nav className="fixed flex justify-center items-center w-full top-0 bg-gradient-to-b from-background to-background/60 backdrop-blur-sm h-16 md:h-20 z-50">
      <div className="flex flex-col lg:flex-row w-full items-center justify-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between w-full">
          <Link href="/">
            <div className="flex items-center space-x-2 text-white text-2xl font-bold">
              <span className="text-orange-500 text-sm">x</span>
              <span className="text-neutral-900 dark:text-white">Ace Cut</span>
              <span className="text-orange-500 text-sm">x</span>
            </div>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden absolute right-4 top-5 z-100"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size="30" /> : <Menu size="30" />}
          </button>
        </div>

        <div className="hidden lg:flex items-center justify-end space-x-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-primary ${
                pathname === route.href
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
          <ModeToggle />
        </div>
      </div>

      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-300 ease-in-out z-40 ${
          menuOpen
            ? "translate-x-0 opacity-100 visible"
            : "-translate-x-full opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center space-y-6 py-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`font-medium transition-colors text-2xl hover:text-primary ${
                pathname === route.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {route.label}
            </Link>
          ))}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
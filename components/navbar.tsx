"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const routes = [
    { href: "/", label: "Kreu" },
    { href: "/services", label: "Shërbimet" },
    // { href: "/team", label: "Our Team" },
    { href: "/booking", label: "Rezervo Tani" },
  ];

  return (
    <nav className="fixed flex justify-center items-center w-full top-0 bg-gradient-to-b from-background to-background/60 backdrop-blur-sm h-16 md:h-20 z-50">
      <div className="flex flex-col lg:flex-row w-full items-center justify-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between w-full">
          <Link href="/">
            <Image
              width={400}
              height={100}
              alt="/"
              src="/logo.svg"
              className="w-48"
            />
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden absolute right-4 top-5 z-100" // Increased z-index here
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
              }${
                route.label === "Book Now" ? " text-yellow-600 font-bold" : ""
              }`}
            >
              {route.label}
            </Link>
          ))}
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
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
              }${route.label === "Book Now" ? " text-yellow-600" : ""}`}
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
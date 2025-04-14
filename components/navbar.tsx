"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isHoveringProducts, setIsHoveringProducts] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  let hoverTimeout: NodeJS.Timeout;

  const routes = [
    { href: "/", label: "Kreu" },
    { href: "/services", label: "Shërbimet" },
    { href: "/booking", label: "Rezervo Tani" },
  ];

  const products = [
    { name: "Depot No.303 Modelling Wax 100ml", href: "https://www.instagram.com/ace_cut_salon?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { name: "Depot 301 Matt Paste 75 ml", href: "https://www.instagram.com/ace_cut_salon?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { name: "Depot No. 314 Shiny Hair Wax", href: "https://www.instagram.com/ace_cut_salon?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { name: "Depot No. 315 Fixing Pomade", href: "https://www.instagram.com/ace_cut_salon?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { name: "Depot No. 302 Clay Pomade", href: "https://www.instagram.com/ace_cut_salon?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  ];

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsHoveringProducts(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsHoveringProducts(false);
    }, 300);
  };

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsHoveringProducts(false);
        setIsProductsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        <div className="hidden lg:flex items-center justify-end space-x-8 relative">
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

          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
          >
            <button
              className={`flex items-center gap-1 text-sm font-medium ${
                isHoveringProducts ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Produktet
              {isHoveringProducts ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            <div className={`absolute top-full left-0 mt-2 w-64 bg-background rounded-lg shadow-lg border transition-all duration-300 ${
              isHoveringProducts 
                ? "opacity-100 visible translate-y-0" 
                : "opacity-0 invisible -translate-y-2"
            }`}>
              {products.map((product) => (
                <Link
                  key={product.name}
                  href={product.href}
                  className="block px-4 py-3 text-sm hover:bg-accent transition-colors"
                  onMouseEnter={() => clearTimeout(hoverTimeout)}
                >
                  {product.name}
                </Link>
              ))}
            </div>
          </div>

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

          <div className="flex flex-col items-center">
            <button
              onClick={toggleProducts}
              className="font-medium text-2xl text-muted-foreground flex items-center gap-2"
            >
              Produktet
              {isProductsOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
            
            <div className={`mt-4 flex flex-col items-center space-y-4 transition-all duration-300 ${
              isProductsOpen 
                ? "opacity-100 max-h-96" 
                : "opacity-0 max-h-0 overflow-hidden"
            }`}>
              {products.map((product) => (
                <Link
                  key={product.name}
                  href={product.href}
                  className="text-lg text-muted-foreground hover:text-primary"
                  onClick={() => {
                    setMenuOpen(false);
                    setIsProductsOpen(false);
                  }}
                >
                  {product.name}
                </Link>
              ))}
            </div>
          </div>

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
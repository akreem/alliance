import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

interface NavbarProps {
  logo?: string;
  menuItems?: Array<{
    label: string;
    href: string;
  }>;
}

const Navbar = ({
  logo = "Alliance Immobilier",
  menuItems = [
    { label: "Accueil", href: "/" },
    { label: "Propriétés", href: "/properties" },
    { label: "À propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        {
          "bg-transparent":
            !isScrolled &&
            !isMobileMenuOpen &&
            (window.location.pathname === "/" ||
              window.location.pathname === "/about"),
          "bg-white shadow-md":
            isScrolled ||
            isMobileMenuOpen ||
            (window.location.pathname !== "/" &&
              window.location.pathname !== "/about"),
        },
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="/"
            className={cn("text-2xl font-bold", {
              "text-white":
                !isScrolled &&
                !isMobileMenuOpen &&
                (window.location.pathname === "/" ||
                  window.location.pathname === "/about"),
              "text-gray-900":
                isScrolled ||
                isMobileMenuOpen ||
                (window.location.pathname !== "/" &&
                  window.location.pathname !== "/about"),
            })}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
          >
            {logo}
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300 hover:text-gray-600",
                  {
                    "text-white":
                      !isScrolled &&
                      !isMobileMenuOpen &&
                      (window.location.pathname === "/" ||
                        window.location.pathname === "/about"),
                    "text-gray-900":
                      isScrolled ||
                      isMobileMenuOpen ||
                      (window.location.pathname !== "/" &&
                        window.location.pathname !== "/about"),
                  },
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu
              className={cn("h-6 w-6", {
                "text-white":
                  !isScrolled &&
                  !isMobileMenuOpen &&
                  (window.location.pathname === "/" ||
                    window.location.pathname === "/about"),
                "text-gray-900":
                  isScrolled ||
                  isMobileMenuOpen ||
                  (window.location.pathname !== "/" &&
                    window.location.pathname !== "/about"),
              })}
            />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block py-2 text-gray-900 text-sm font-medium hover:text-gray-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Menu, LogOut, User } from "lucide-react";
import { isAuthenticated, getCurrentUser, logout } from "@/utils/auth";
import AuthDialog from "../auth/AuthDialog";

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
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "signup">(
    "login",
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Check authentication status
    const authStatus = isAuthenticated();
    setUserAuthenticated(authStatus);

    // Get username if authenticated
    if (authStatus) {
      const user = getCurrentUser();
      if (user && user.username) {
        setUsername(user.username);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserAuthenticated(false);
    setUsername("");
  };

  const openLoginDialog = () => {
    setAuthDialogTab("login");
    setAuthDialogOpen(true);
  };

  const openSignupDialog = () => {
    setAuthDialogTab("signup");
    setAuthDialogOpen(true);
  };

  const handleAuthSuccess = () => {
    setAuthDialogOpen(false);
    // Refresh authentication status
    const authStatus = isAuthenticated();
    setUserAuthenticated(authStatus);

    if (authStatus) {
      const user = getCurrentUser();
      if (user && user.username) {
        setUsername(user.username);
      }
    }
  };

  return (
    <>
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

              {userAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <a
                    href="/account"
                    className={cn("text-sm font-medium flex items-center", {
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
                  >
                    <User className="h-4 w-4 mr-1" /> {username}
                  </a>
                  <button
                    onClick={handleLogout}
                    className={cn(
                      "text-sm font-medium transition-colors duration-300 hover:text-gray-600 flex items-center",
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
                    <LogOut className="h-4 w-4 mr-1" /> Déconnexion
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openLoginDialog();
                    }}
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
                    Connexion / Inscription
                  </a>
                </div>
              )}
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

              {userAuthenticated ? (
                <>
                  <a
                    href="/account"
                    className="block py-2 text-gray-900 text-sm font-medium flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-1" /> {username}
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block py-2 text-gray-900 text-sm font-medium hover:text-gray-600 w-full text-left flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-1" /> Déconnexion
                  </button>
                </>
              ) : (
                <div className="pt-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openLoginDialog();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block py-2 text-gray-900 text-sm font-medium hover:text-gray-600 w-full text-left"
                  >
                    Connexion / Inscription
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Auth Dialog */}
      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        defaultTab={authDialogTab}
      />
    </>
  );
};

export default Navbar;

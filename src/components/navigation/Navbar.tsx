import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Menu,
  LogOut,
  User,
  ChevronRight,
  Settings,
  Globe,
  DollarSign,
} from "lucide-react";
import { isAuthenticated, getCurrentUser, logout } from "@/utils/auth";
import AuthDialog from "../auth/AuthDialog";
import { ThemeToggle } from "../ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
            "bg-white dark:bg-gray-900 shadow-md":
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
                "text-gray-900 dark:text-white":
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
                      "text-gray-900 dark:text-white":
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center space-x-2 cursor-pointer bg-gray-800 dark:bg-gray-700 rounded-full p-1 pr-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {username}
                      </span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 dark:bg-gray-800"
                  >
                    <div className="flex items-center p-2">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">
                          {username}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {getCurrentUser()?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="dark:border-gray-700" />
                    <DropdownMenuItem className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-700">
                      <Globe className="mr-2 h-4 w-4" />
                      <span>Langue</span>
                      <div className="ml-auto flex items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Français
                        </span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-700">
                      <DollarSign className="mr-2 h-4 w-4" />
                      <span>Devise</span>
                      <div className="ml-auto flex items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          TND
                        </span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-700">
                      <div className="mr-2 h-4 w-4 flex items-center justify-center">
                        <ThemeToggle showText={true} />
                      </div>
                      <span>Thème</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="dark:border-gray-700" />
                    <DropdownMenuItem
                      className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-700"
                      onClick={() => (window.location.href = "/account")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Mon compte</span>
                    </DropdownMenuItem>
                    {getCurrentUser()?.isStaff && (
                      <DropdownMenuItem
                        className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-700"
                        onClick={() =>
                          (window.location.href = "/admin/dashboard")
                        }
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Administration</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="dark:border-gray-700" />
                    <DropdownMenuItem
                      className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-700"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Déconnexion</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="default"
                    className="rounded-full bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.preventDefault();
                      openLoginDialog();
                    }}
                  >
                    Connexion
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-gray-800"
                    onClick={(e) => {
                      e.preventDefault();
                      openSignupDialog();
                    }}
                  >
                    Inscription
                  </Button>
                  <ThemeToggle />
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
                <div className="pt-2 flex flex-col space-y-2">
                  <Button
                    variant="default"
                    className="rounded-full bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.preventDefault();
                      openLoginDialog();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Connexion
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={(e) => {
                      e.preventDefault();
                      openSignupDialog();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Inscription
                  </Button>
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

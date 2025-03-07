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
    { label: "Administration", href: "/admin/dashboard" },
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
              window.location.pathname === "/",
            "bg-white dark:bg-gray-900 shadow-md":
              isScrolled ||
              isMobileMenuOpen ||
              window.location.pathname !== "/",
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
                  window.location.pathname === "/",
                "text-gray-900 dark:text-white":
                  isScrolled ||
                  isMobileMenuOpen ||
                  window.location.pathname !== "/",
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
              {menuItems.map((item, index) => {
                // Only show Admin link if user is staff
                if (
                  item.href === "/admin/dashboard" &&
                  (!userAuthenticated || !getCurrentUser()?.isStaff)
                ) {
                  return null;
                }
                return (
                  <a
                    key={index}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-300 hover:text-gray-600",
                      {
                        "text-white":
                          !isScrolled &&
                          !isMobileMenuOpen &&
                          window.location.pathname === "/",
                        "text-gray-900 dark:text-white":
                          isScrolled ||
                          isMobileMenuOpen ||
                          window.location.pathname !== "/",
                      },
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}

              <div className="flex items-center space-x-3">
                <ThemeToggle />

                {userAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center space-x-2 cursor-pointer bg-blue-600 dark:bg-blue-700 rounded-full p-1 pr-3 hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600">
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
                      <div className="flex items-center p-3 border-b dark:border-gray-700">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3">
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
                      <div className="p-2">
                        <DropdownMenuItem className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-700 rounded-md">
                          <Globe className="mr-2 h-4 w-4" />
                          <span>Langue</span>
                          <div className="ml-auto flex items-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Français
                            </span>
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-700 rounded-md"
                          onClick={() => (window.location.href = "/account")}
                        >
                          <User className="mr-2 h-4 w-4" />
                          <span>Mon compte</span>
                        </DropdownMenuItem>
                        {getCurrentUser()?.isStaff && (
                          <DropdownMenuItem
                            className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-700 rounded-md"
                            onClick={() =>
                              (window.location.href = "/admin/dashboard")
                            }
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Administration</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="cursor-pointer text-red-500 dark:text-red-400 dark:focus:bg-gray-700 rounded-md"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Déconnexion</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      variant={!isScrolled && window.location.pathname === "/" ? "default" : "outline"}
                      size="sm"
                      onClick={openLoginDialog}
                      className={cn({
                        "bg-blue-600 hover:bg-blue-700 text-white border-transparent":
                          !isScrolled && window.location.pathname === "/",
                      })}
                    >
                      Connexion
                    </Button>
                    <Button size="sm" onClick={openSignupDialog}>
                      Inscription
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu
                className={cn("h-6 w-6", {
                  "text-white":
                    !isScrolled &&
                    !isMobileMenuOpen &&
                    window.location.pathname === "/",
                  "text-gray-900 dark:text-white":
                    isScrolled ||
                    isMobileMenuOpen ||
                    window.location.pathname !== "/",
                })}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {menuItems.map((item, index) => {
                  // Only show Admin link if user is staff
                  if (
                    item.href === "/admin/dashboard" &&
                    (!userAuthenticated || !getCurrentUser()?.isStaff)
                  ) {
                    return null;
                  }
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className="text-gray-900 dark:text-white font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  );
                })}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <ThemeToggle />

                  {userAuthenticated ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {username}
                        </p>
                        <button
                          onClick={handleLogout}
                          className="text-sm text-red-500"
                        >
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          openLoginDialog();
                        }}
                      >
                        Connexion
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          openSignupDialog();
                        }}
                      >
                        Inscription
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Dialog */}
      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        defaultTab={authDialogTab}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navbar;

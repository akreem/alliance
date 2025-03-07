import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle({ showText = false }) {
  const { theme, setTheme } = useTheme();

  if (showText) {
    return (
      <div className="flex items-center">
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={
        theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"
      }
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-white" />
      ) : (
        <Moon className="h-5 w-5 text-white" />
      )}
      <span className="sr-only">
        {theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
      </span>
    </Button>
  );
}

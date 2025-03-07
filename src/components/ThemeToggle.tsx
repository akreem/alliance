import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={
        theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"
      }
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">
        {theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
      </span>
    </Button>
  );
}

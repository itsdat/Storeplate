"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSetTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={handleSetTheme}
      className="relative w-6 h-6 transition-all duration-300 flex items-center cursor-pointer"
    >
      <div
        className={`absolute left-0 active:scale-50 active:animate-spin top-0 w-6 h-6 flex items-center justify-center transform transition-all duration-300 ease-in-out`}
      >
        {theme === "dark" ? (
          <Moon color="var(--color-text)" className="stroke-1" />
        ) : (
          <Sun color="var(--color-text)" />
        )}
      </div>
    </button>
  );
}

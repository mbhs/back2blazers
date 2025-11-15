"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa6";

export function ThemeToggle(){
  const {theme, setTheme} = useTheme();

  return (
    <Button 
      aria-label="Theme Toggle Button" 
      variant="outline" 
      size="icon" 
      className="backdrop-blur-xs rounded-full cursor-pointer button" 
      onClick= {() => {
        setTheme(theme === "light" ? "dark" : "light")
      }}
    >
      <FaSun className="absolute rotate-0 scale-100 dark:-rotate-90 dark:scale-0"></FaSun>
      <FaMoon className="absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100"></FaMoon>
    </Button>
  )
}
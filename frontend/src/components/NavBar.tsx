import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GearIcon } from "@radix-ui/react-icons";
import { Sun, Moon, Settings2 } from "lucide-react";

interface NavBarProps {
  handleThemeSwitch: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ handleThemeSwitch }) => {
  // Local dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Update local dark mode state when the theme is switched
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    handleThemeSwitch(); // Call the theme switch function here
  };

  return (
    <nav className="mb-2 flex items-center justify-between">
      <h3 className="text-2xl font-black text-black dark:text-white">
        Leet
        <span className="text-orange-400">Copilot</span>
      </h3>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="reallySmall"
          aria-label="Toggle Theme"
          className="mr-6 hover:text-orange-400 dark:hover:text-white"
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5 text-orange-400 hover:text-white" />
          )}
        </Button>
        <Button variant="ghost" size="reallySmall">
          <Settings2 className="h-5 w-5 text-black hover:text-orange-400 dark:text-orange-400 dark:hover:text-white" />
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;

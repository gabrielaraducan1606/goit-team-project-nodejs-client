import React from "react";
import ThemeToggle from "./themeToggle";  // Importă ThemeToggle
import UserInfo from "./UserInfo";  // Asum că ai deja componenta UserInfo

const Header = () => {
  return (
    <header className="flex justify-end gap-[14px] items-center p-4" 
            style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Info utilizator */}
      <UserInfo />
    </header>
  );
};

export default Header;

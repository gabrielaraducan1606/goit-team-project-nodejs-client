import React from "react";
import ThemeToggle from "./themeToggle";
import UserInfo from "./UserInfo";

const Header = () => {
  return (
    <header className="flex justify-end gap-[14px] items-center p-4" >
      <ThemeToggle />
      <UserInfo />
    </header>
  );
};

export default Header;

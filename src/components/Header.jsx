import React from "react";
import ThemeToggle from "./themeToggle";
import UserInfo from "./UserInfo";

const Header = () => {
  return (
    <header className="flex w-full justify-end bg-top-bar gap-[14px] items-center p-4" >
      <ThemeToggle />
      <UserInfo />
    </header>
  );
};

export default Header;

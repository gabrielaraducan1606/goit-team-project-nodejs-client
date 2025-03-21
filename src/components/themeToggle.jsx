import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const system = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  return (
    <div>
      <select className="hover:cursor-pointer group"
        onChange={(e) => {
          setTheme(e.target.value);
        }}
      >
        <option value={system}>System</option>
        <option value={"dark"}>Dark</option>
        <option value={"light"}>Light</option>
        <option value={"violet"}>Violet</option>
      </select>
    </div>
  );
};

export default ThemeToggle;

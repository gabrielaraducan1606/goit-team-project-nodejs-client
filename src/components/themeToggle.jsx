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
      <select
        className="hover:cursor-pointer group bg-background rounded-xl p-2 ring-1 ring-primary"
        onChange={(e) => {
          setTheme(e.target.value);
        }}
      >
        <option className="bg-background " disabled>
          Theme
        </option>
        <option className="bg-background" value={system}>
          System
        </option>
        <option className="bg-background" value={"dark"}>
          Dark
        </option>
        <option className="bg-background" value={"light"}>
          Light
        </option>
        <option className="bg-background" value={"violet"}>
          Violet
        </option>
      </select>
    </div>
  );
};

export default ThemeToggle;

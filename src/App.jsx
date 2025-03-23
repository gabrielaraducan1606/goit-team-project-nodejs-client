import React from "react";
import ThemeToggle from "./components/themeToggle";
import Welcome from "./pages/WelcomePage";

const App = () => {
  return (
    <>
      <Welcome/>
      <ThemeToggle />
      <h3 className="text-6xl">tailwind test</h3>
      <button>test</button>
    </>
  );
};

export default App;

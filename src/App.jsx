import React from "react";
import ThemeToggle from "./components/themeToggle";
import Dashboard from './components/mainDashboard/mainDashboard';

const App = () => {
  return (
    <>
      <ThemeToggle />
      <Dashboard />
    </>
  );
};

export default App;
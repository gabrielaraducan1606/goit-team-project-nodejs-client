import React from "react";
import ThemeToggle from "./components/themeToggle";
import { selectUserData } from "./services/reduxServices";
import { useSelector } from "react-redux";

const App = () => {
  const userData = useSelector(selectUserData);
  console.log(userData);

  return (
    <>
      <ThemeToggle />
      <h3 className="text-6xl">tailwind test</h3>
      <button>test</button>
    </>
  );
};

export default App;

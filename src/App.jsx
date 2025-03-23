import React from "react";
import ThemeToggle from "./components/themeToggle";
import Welcome from "./pages/WelcomePage";

import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "./redux/selectors";
import { loginUser } from "./services/reduxServices";

const App = () => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  console.log(userData);

  const handleClick = () => {
     dispatch(loginUser({email:'alex@email.com', password:'123123123'}))
  };
  return (
    <>
      <Welcome/>
      <ThemeToggle />
      <h3 className="text-6xl">tailwind test</h3>
      <button onClick={handleClick}>test</button>
    </>
  );
};

export default App;

import React from "react";
import ThemeToggle from "./components/themeToggle";
import Welcome from "./pages/WelcomePage";
import { useDispatch, useSelector } from "react-redux";
import { selectColumns, selectUserData } from "./redux/selectors";
import { fetchColumns, loginUser } from "./services/reduxServices";

const App = () => {
  const userData = useSelector(selectUserData);
  const boards = useSelector(selectColumns);
  const dispatch = useDispatch();
  console.log(userData);
  console.log(boards);

  const handleClick = () => {
    dispatch(loginUser({ email: "alex@email.com", password: "123123123" }));
    dispatch(fetchColumns("67e03dd656c61f514590c2c8"));
    // dispatch(createBoard({ title: "board 1232", background: "http://localhost:5000/images/star-sky.jpg" }));
  };
  return (
    <>
      <Welcome />
      <ThemeToggle />
      <h3 className="text-6xl">tailwind test</h3>
      <button onClick={handleClick}>test</button>
    </>
  );
};

export default App;

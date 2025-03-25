import React from "react";
import ThemeToggle from "./components/themeToggle";
import Welcome from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectColumns, selectUserData } from "./redux/selectors";
import { fetchBoards, loginUser } from "./services/reduxServices";

const App = () => {
  const userData = useSelector(selectUserData);
  const boards = useSelector(selectColumns);
  const dispatch = useDispatch();
  console.log(userData);
  console.log(boards);

  const handleClick = () => {
    dispatch(loginUser({ email: "alex@email.com", password: "123123123" }));
    dispatch(fetchBoards());
    // dispatch(createBoard({ title: "board 1232", background: "http://localhost:5000/images/star-sky.jpg" }));
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<HomePage />}>
            {/* <Route path=":boardId" element={<BoardPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      <button onClick={handleClick}>test</button>
    </>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ThemeToggle from "./components/themeToggle";
import Welcome from "./pages/WelcomePage";
import { useDispatch, useSelector } from "react-redux";
import { selectBoards, selectUserData } from "./redux/selectors";
import { fetchBoards, loginUser } from "./services/reduxServices";
import ModalController from "./components/ModalController";
import ModalsTester from "./components/ModalsTester";

const HomePage = () => {
  const userData = useSelector(selectUserData);
  const boards = useSelector(selectBoards);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(loginUser({ email: "alex@email.com", password: "123123123" }));
    dispatch(fetchBoards());
  };

  return (
    <div>
      <Welcome />
      <ThemeToggle />
      <h3 className="text-6xl">tailwind test</h3>
      <button onClick={handleClick}>test</button>

      <div className="mt-4">
        <Link
          to="/modal-test"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Deschide Tester Modale
        </Link>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ModalController />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/modal-test" element={<ModalsTester />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

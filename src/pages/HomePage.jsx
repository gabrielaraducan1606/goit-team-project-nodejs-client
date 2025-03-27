import React from "react";
import ThemeToggle from "../components/themeToggle";
import { useDispatch, useSelector } from "react-redux";
import { selectBoards, selectUserData } from "../redux/selectors";
import { fetchBoards, loginUser } from "../services/reduxServices";
import { useNavigate } from "react-router-dom";
import { openModal } from "../utils/modalUtils";

const HomePage = () => {
  const userData = useSelector(selectUserData);
  const boards = useSelector(selectBoards);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(userData);
  console.log(boards);

  const handleClick = () => {
    dispatch(loginUser({ email: "alex@email.com", password: "123123123" }));
    dispatch(fetchBoards());
  };

  const handleOpenNewBoardModal = () => {
    openModal(navigate, "newBoard");
  };

  return (
    <>
      <ThemeToggle />
      <h3 className="text-6xl">tailwind test</h3>
      <button onClick={handleClick}>test</button>
      <button onClick={handleOpenNewBoardModal}>Open New Board Modal</button>
    </>
  );
};

export default HomePage;

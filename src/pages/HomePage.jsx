import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { fetchBoards } from "../services/reduxServices";
import { useNavigate } from "react-router-dom";
import { openModal } from "../utils/modalUtils";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchBoards());
  }, []);
  const handleOpenNewBoardModal = () => {
    openModal(navigate, "newBoard");
  };
  return (
    <div className="flex h-screen">
      <Sidebar />
      <button onClick={handleOpenNewBoardModal}>Open New Board Modal</button>
      <div className="flex flex-col flex-1">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
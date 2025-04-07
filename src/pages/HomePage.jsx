import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchBoards } from "../services/reduxServices";
import { selectBoards } from "../redux/selectors";
import { selectBG } from "../services/userServices";
import { Slide, toast, ToastContainer } from "react-toastify";
const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBoards());
  }, []);
  const { boardId } = useParams();

  const boards = useSelector(selectBoards);
  const backgroundSrc = selectBG(boardId, boards);
  const triggerToast = (mode) => {
    if (mode === "success") {
      toast.success("Help is on the way! Hang tight", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
    toast.error("This time you're on your own....", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar triggerToast={triggerToast} />
      <div className={`flex flex-col w-full md:w-[calc(100%-245px)] `}>
        <Header />
        <div
          className={`overflow-x-auto whitespace-nowrap h-full relative`}
          style={{ backgroundImage: `url(${backgroundSrc})` }}
        >
          <Outlet />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

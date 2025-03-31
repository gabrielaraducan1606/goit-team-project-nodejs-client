import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { fetchBoards } from "../services/reduxServices";
const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBoards());
  }, []);
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-[calc(100%-256px)] ">
        <Header />
        <div className="overflow-x-auto whitespace-nowrap h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
// daca nu ai asta nu ai facut update
export default HomePage;

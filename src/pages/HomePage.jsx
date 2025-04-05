import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchBoards } from "../services/reduxServices";
import { selectBoards } from "../redux/selectors";
import { selectBG } from "../services/userServices";
const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBoards());
  }, []);
  const { boardId } = useParams();

  const boards = useSelector(selectBoards);
  const backgroundSrc = selectBG(boardId, boards);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div
        className={`flex flex-col w-full md:w-[calc(100%-245px)]`}
        style={{
          backgroundImage: `url(${backgroundSrc})`,
          backgroundRepeat: "no-repeat",
          backgroundSize:'1500px',
        }}
      >
        <Header />
        <div className={`overflow-x-auto whitespace-nowrap h-full`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

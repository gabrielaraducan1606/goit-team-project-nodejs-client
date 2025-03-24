import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ScreensPage from "../components/ScreensPage";

const HomePage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <ScreensPage />
      </div>
    </div>
  );
};

export default HomePage;

import { useParams } from "react-router-dom";

const ScreensPage = () => {
  const { boardName } = useParams();

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-4">{boardName}</h1>
      {/* conținutul dinamic al paginii */}
    </div>
  );
};

export default ScreensPage;

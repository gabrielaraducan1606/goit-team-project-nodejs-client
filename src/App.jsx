import { BrowserRouter, useRoutes } from "react-router-dom";
import appRoutes from "./routes/appRoutes";

const AppRoutes = () => {
  const routing = useRoutes(appRoutes);
  return routing;
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;

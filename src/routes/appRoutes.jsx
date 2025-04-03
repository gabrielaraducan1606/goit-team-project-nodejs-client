import { Route } from "react-router-dom";
import Welcome from "../pages/WelcomePage";
import Registration from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import Board from "../pages/Board";
import PrivateRoute from "../routes/privateRoute";
import PublicRoute from "../routes/publicRoute";

const appRoutes = [
  {
    path: "/welcome",
    element: (
      <PublicRoute>
        <Welcome />
      </PublicRoute>
    ),
  },
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <Registration />
      </PublicRoute>
    ),
  },

  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
    children: [
      {
        path: ":boardId",
        element: <Board />,
      },
    ],
  },
];

export default appRoutes;

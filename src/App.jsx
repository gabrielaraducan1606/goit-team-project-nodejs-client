import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/WelcomePage";
import Registration from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Board from "./pages/Board";
import Dashboard from './components/mainDashboard/mainDashboard';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path=":boardId" element={<Board />} />
          </Route>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/auth" element={<Registration />} />
          <Route path="/auth" element={<Registration />} />
          <Dashboard />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
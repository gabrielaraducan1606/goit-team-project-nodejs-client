import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Welcome from "./pages/WelcomePage";
import ModalController from "./components/ModalController";

const App = () => {
  return (
    <Router>
      <ModalController />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
};

export default App;

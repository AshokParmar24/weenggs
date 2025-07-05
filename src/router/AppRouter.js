import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home/index";
import About from "../components/About";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/:id" element={<About />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

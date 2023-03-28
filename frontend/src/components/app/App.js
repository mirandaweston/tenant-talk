import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import Signup from "../signup/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

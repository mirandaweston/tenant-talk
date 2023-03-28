import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import LogInForm from "./Login/loginForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogInForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

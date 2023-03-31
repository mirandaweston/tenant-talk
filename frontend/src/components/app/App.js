import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import Signup from "../signup/Signup";
import LoginForm from "../Login/loginForm";
import Results from "../results/Results";
import WithNav from "../withNav/WithNav";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<WithNav />}>
          <Route path="/results" element={<Results />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import Signup from "../signup/Signup";
import LoginForm from "../Login/loginForm";
import Results from "../results/Results";
import ReviewsList from "../reviewsList/reviewsList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/results" element={<Results />} />
        <Route path="/ReviewsList" element={<ReviewsList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

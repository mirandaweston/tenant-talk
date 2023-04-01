import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import Signup from "../signup/Signup";
import LoginForm from "../Login/loginForm";
import Results from "../results/Results";
import PropertyReviewsPage from "../propertyReviews/propertyReviews";
import WithNav from "../withNav/WithNav";
import AboutPage from "../aboutPage/aboutPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<WithNav />}>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Route>
        <Route path="/property/:id" element={<PropertyReviewsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

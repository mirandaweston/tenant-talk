import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import Signup from "../signup/Signup";
import LoginForm from "../Login/loginForm";
import Results from "../results/Results";
import PropertyReviewsPage from "../propertyReviews/propertyReviews";
import NewReview from "../newReview/NewReview";
import Navigation from "../navigation/Navigation";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/results" element={<Results />} />
        <Route element={<Navigation />}>
          <Route path="/property/:id" element={<PropertyReviewsPage />} />

          <Route path="/review/new" element={<NewReview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

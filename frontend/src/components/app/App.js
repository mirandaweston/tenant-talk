import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import Signup from "../signup/Signup";
import LoginForm from "../login/LoginForm";
import Properties from "../properties/Properties";
import PropertyReviewsPage from "../propertyReviews/PropertyReviews";
import NewReview from "../newReview/NewReview";
import WithNav from "../withNav/WithNav";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<WithNav />}>
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyReviewsPage />} />
          <Route path="/review/new" element={<NewReview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "../home/Home";
import Signup from "../signup/Signup";
import Login from "../login/Login";
import Properties from "../properties/Properties";
import Property from "../property/Property";
import NewReview from "../newReview/NewReview";
import AboutPage from "../aboutPage/AboutPage";
import NotFound from "../notFound/notFound";
import useAuthContext from "../../hooks/useAuthContext";
import NavBar from "../navBar/NavBar";
import Profile from "../profile/Profile";
import ToasterWrapper from "../toasterWrapper/ToasterWrapper";
import Review from "../review/Review";
import AuthLayout from "../authLayout/AuthLayout";
import FaqPage from "../ratingGuide/ratingGuide";

const App = () => {
  const { token } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route element={<AuthLayout />}>
          <Route
            path="/signup"
            element={token ? <Navigate to="/properties" /> : <Signup />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/properties" /> : <Login />}
          />
        </Route>
        <Route element={<NavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route
            path="/property/:id"
            element={token ? <Property /> : <Navigate to="/login" />}
          />
          <Route
            path="/review/new"
            element={token ? <NewReview /> : <Navigate to="/login" />}
          />
          <Route
            path="/review/:id"
            element={token ? <Review /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ratingguide" element={<FaqPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToasterWrapper />
    </BrowserRouter>
  );
};

export default App;

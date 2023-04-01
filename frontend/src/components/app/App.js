import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "../home/Home";
import Signup from "../signup/Signup";
import Login from "../login/Login";
import Properties from "../properties/Properties";
import Property from "../property/Property";
import NewReview from "../newReview/NewReview";
import WithNav from "../withNav/WithNav";
import AboutPage from "../aboutPage/aboutPage";
import useAuthContext from "../../hooks/useAuthContext";

const App = () => {
  const { token } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route element={<WithNav />}>
          <Route path="/properties" element={<Properties />} />
          <Route
            path="/property/:id"
            element={token ? <Property /> : <Navigate to="/login" />}
          />
          <Route
            path="/review/new"
            element={token ? <NewReview /> : <Navigate to="/login" />}
          />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

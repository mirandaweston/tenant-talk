import React, { useEffect, createContext, useReducer } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AuthContext = createContext();

const save = ({ user, token }) => {
  window.localStorage.setItem("token", token);
  return { user, token };
};

const clear = () => {
  window.localStorage.removeItem("token");
  return { user: null, token: null };
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return save(action.payload);
    case "refresh":
      return save(action.payload);
    case "logout":
      return clear();
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
  });

  const getUser = async (token) => {
    try {
      const { data } = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "login",
        payload: data,
      });
    } catch {
      dispatch({ type: "logout" });
    }
  };

  // get user and new token with stored token on every refresh or new window
  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      getUser(token);
    }
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
import { useState } from "react";
import axios from "axios";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("/user/login", formData);
      dispatch({
        type: "login",
        payload: data,
      });
    } catch (err) {
      setError(err.response.data.error);
    }
    setIsLoading(false);
  };

  return { login, isLoading, error };
};

export default useLogin;

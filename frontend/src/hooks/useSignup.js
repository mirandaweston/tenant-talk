import { useState } from "react";
import axios from "axios";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("/user/signup", formData);
      dispatch({
        type: "login",
        payload: data,
      });
    } catch (err) {
      setError(err.response.data.error);
    }
    setIsLoading(false);
  };

  return { signup, isLoading, error };
};

export default useSignup;

import { toast } from "react-hot-toast";
import useAuthContext from "./useAuthContext";

const useError = () => {
  const { dispatch } = useAuthContext();

  const handleError = ({ response: { data, status } }) => {
    if (data.message === "auth error" && status === 401) {
      dispatch({ type: "logout" });
      toast.error("Please login again");
    } else {
      toast.error(data.message);
    }
  };

  return { handleError };
};

export default useError;

import { useState } from "react";
import axios from "axios";

const useUpload = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  // uploads the image to Cloudinary
  const upload = async (image) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "luublxr1");

    try {
      const {
        data: { public_id: publicId },
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/dfawheswi/upload",
        formData
      );
      return publicId;
    } catch (err) {
      setError(err.response.data.error);
    }
    setIsLoading(false);
  };
  return { upload, isLoading, error };
};

export default useUpload;

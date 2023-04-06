import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const useUpload = () => {
  const [isLoading, setIsLoading] = useState(null);

  // uploads the image to Cloudinary
  const upload = async (image) => {
    setIsLoading(true);

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
      toast.error(err.response.data.error.message);
    }
    setIsLoading(false);
  };
  return { upload, isLoading };
};

export default useUpload;

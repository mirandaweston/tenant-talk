import { useState } from "react";
import axios from "axios";

const useUpload = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  // uploads the image to Cloudinary
  const upload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "luublxr1");

    // formData.append("upload_preset", "llzecft2");

    if (token !== "undefined" && image) {
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dfawheswi/upload",
          formData
        );

        const { data } = response;
        console.log(data);
        // 3. save the publicId to the database
        const imageRes = await axios.post(
          "/images",
          { publicId: data.public_id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const imageData = imageRes.data;

        window.localStorage.setItem("token", imageData.token);
        setToken(window.localStorage.getItem("token"));
        return imageData.public_id;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    // return null;
  };
  return upload;
};

export default useUpload;

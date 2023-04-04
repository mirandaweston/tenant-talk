import React from "react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from "@cloudinary/url-gen";

// import React, { useState, useContext } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryContext } from "../../contexts/CloudinaryContext";

const AboutPage = () => {
  const myImage = new CloudinaryImage("sample", {
    cloudName: "dfawheswi",
  }).resize(fill().width(100).height(150));

  // Render the image in a React component.
  return (
    <div>
      <h1>About Page</h1>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
};

export default AboutPage;

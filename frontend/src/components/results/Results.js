import { useLocation } from "react-router-dom";
import React from "react";

const Results = () => {
  const location = useLocation();

  return (
    <>
      <div>You searched for:</div>
      {location.state.description && <div>{location.state.description}</div>}
    </>
  );
};

export default Results;

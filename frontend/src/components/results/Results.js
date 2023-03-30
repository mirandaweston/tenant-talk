import React from "react";
import { useSearchParams } from "react-router-dom";
import useAxios from "axios-hooks";
import useAuthContext from "../../hooks/useAuthContext";

const Results = () => {
  const [searchParams] = useSearchParams();
  const { token } = useAuthContext();

  const [{ loading, data, error }] = useAxios({
    url: "/property/address",
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    params: {
      address: searchParams.get("description"),
    },
  });

  return (
    <>
      <div>Hello</div>
      <div>Search results:</div>

      {error && <div>{error.message}</div>}
      {loading && <div>Currently loading</div>}

      {data && <div>{data.property.address}</div>}
      {data && <div>{data.property._id}</div>}
    </>
  );
};

export default Results;

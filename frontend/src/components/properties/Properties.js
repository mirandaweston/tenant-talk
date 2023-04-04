import React from "react";
import { useSearchParams } from "react-router-dom";
import useAxios from "axios-hooks";
import PropertyCard from "../propertyCard/PropertyCard";

const Properties = () => {
  const [searchParams] = useSearchParams();

  const [{ loading, data, error }] = useAxios({
    url: "/properties",
    method: "GET",
    params: {
      address: searchParams.get("address"),
    },
  });

  return (
    <>
      {error && <div>{error.message}</div>}
      {loading && <div>Currently loading</div>}
      {!error && data && data.properties.length === 0 && (
        <div>No properties found 🙁</div>
      )}
      {data && (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </ul>
      )}
    </>
  );
};

export default Properties;

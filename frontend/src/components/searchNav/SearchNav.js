import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Search from "../search/Search";

const SearchNav = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPlace, setSelectedPlace] = useState(
    searchParams.get("address")
  );

  const search = (place) => {
    setSearchParams(place ? { address: place } : {});
    setSelectedPlace(place);
  };

  return <Search onChange={search} value={selectedPlace} location="nav" />;
};

export default SearchNav;

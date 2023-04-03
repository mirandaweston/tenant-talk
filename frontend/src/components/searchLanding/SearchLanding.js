import React, { useState } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Link } from "react-router-dom";
import Search from "../search/Search";

const SearchLanding = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <form className="mx-auto mt-10 flex max-w-md gap-x-4">
      <Search
        variant="blur"
        value={selectedPlace}
        onChange={setSelectedPlace}
      />
      <Link
        to="/properties"
        state={selectedPlace}
        className="flex items-center rounded-full bg-orange-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
      >
        Search
      </Link>
      <button
        type="submit"
        className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Notify me
      </button>
    </form>
  );
};

export default SearchLanding;

import React, { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const Search = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const navigate = useNavigate();

  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.REACT_APP_API_KEY,
      debounce: 500,
      options: {
        types: ["address"],
        componentRestrictions: { country: "gb" },
      },
    });

  const search = () => {
    navigate({
      pathname: "results",
      search: queryString.stringify({
        terms: selectedPlace.terms.map(({ value }) => value),
        description: selectedPlace.description,
      }),
    });
  };

  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Combobox
        as="div"
        value={selectedPlace}
        onChange={setSelectedPlace}
        nullable
        className="w-full"
      >
        <Combobox.Input
          className="w-full rounded-full border-0 bg-white/5 py-5 pr-24 pl-7 text-white shadow-sm ring-1 ring-inset ring-white/10 backdrop-blur-md placeholder:text-white/60 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
          onChange={(event) =>
            getPlacePredictions({ input: event.target.value })
          }
          displayValue={(place) => place?.description}
          placeholder="Search by address"
        />

        <Transition
          enter="transition duration-100"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-white p-2 text-base shadow-lg ring-1 ring-inset ring-black/5 focus:outline-none sm:text-sm">
            {isPlacePredictionsLoading ? (
              <div className="relative animate-pulse cursor-default select-none py-2 text-gray-900">
                Loading...
              </div>
            ) : placePredictions.length === 0 ? (
              <div className="relative cursor-default select-none py-2 text-gray-900">
                No properties found
              </div>
            ) : (
              placePredictions.map(
                ({
                  description,
                  place_id: id,
                  structured_formatting: {
                    main_text: mainText,
                    secondary_text: secondaryText,
                  },
                  terms,
                }) => (
                  <Combobox.Option
                    key={id}
                    value={{ description, terms }}
                    className={({ active }) =>
                      clsx(
                        "relative cursor-default select-none rounded-lg py-2 pl-3 pr-9",
                        active ? "bg-orange-500 text-white" : "text-gray-900"
                      )
                    }
                  >
                    {({ active }) => (
                      <div className="flex">
                        <span className="truncate">{mainText}</span>
                        <span
                          className={clsx(
                            "ml-2 truncate",
                            active ? "text-orange-100" : "text-gray-500"
                          )}
                        >
                          {secondaryText}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                )
              )
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
      <div className="absolute inset-y-0 right-0 flex p-1.5">
        <button
          type="button"
          onClick={search}
          className="flex items-center rounded-full bg-orange-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Search;

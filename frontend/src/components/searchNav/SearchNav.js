import React, { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import queryString from "query-string";
import { useLocation, useSearchParams } from "react-router-dom";

const SearchNav = () => {
  const [, setSearchParams] = useSearchParams();
  const { state } = useLocation();
  const [selectedPlace, setSelectedPlace] = useState(state);

  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.REACT_APP_API_KEY,
      debounce: 500,
      options: {
        types: ["address"],
        componentRestrictions: { country: "gb" },
      },
    });

  const createQuery = ({ terms }) =>
    queryString.stringify({
      terms: terms.map(({ value }) => value),
    });

  const search = (place) => {
    if (place) setSearchParams(createQuery(place));
    setSelectedPlace(place);
  };

  return (
    <Combobox as="div" value={selectedPlace} onChange={search} nullable>
      <Combobox.Label className=" sr-only">Address</Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
          onChange={(event) =>
            getPlacePredictions({ input: event.target.value })
          }
          displayValue={(place) => place?.description}
          placeholder="Search for an address"
        />

        <Transition
          enter="transition duration-100"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {isPlacePredictionsLoading ? (
              <div className="relative animate-pulse cursor-default select-none py-2 text-center text-gray-900">
                Loading...
              </div>
            ) : placePredictions.length === 0 ? (
              <div className="relative cursor-default select-none py-2 text-center text-gray-900">
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
                        "relative cursor-default select-none rounded-sm py-2 pl-3 pr-9",
                        active ? "bg-orange-500 text-white" : "text-gray-900"
                      )
                    }
                  >
                    {({ active }) => (
                      <div className="flex">
                        <span className="truncate">{mainText}</span>
                        <span
                          className={clsx(
                            "ml-2 truncate text-gray-500",
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
      </div>
    </Combobox>
  );
};

export default SearchNav;

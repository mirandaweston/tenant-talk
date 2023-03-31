import React, { useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import axios from "axios";
import PropTypes from "prop-types";
import AddressFeedback from "../addressFeedback/AddressFeedback";

const SearchValidate = ({
  selectedPlace,
  setSelectedPlace,
  foundProperty,
  setFoundProperty,
}) => {
  const [, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.REACT_APP_API_KEY,
      debounce: 500,
      options: {
        types: ["address"],
        componentRestrictions: { country: "gb" },
      },
    });

  const getProperty = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("/property/address", {
        params: { address: selectedPlace.address },
      });
      if (data.property) {
        setFoundProperty(data.property);
      } else {
        setFoundProperty(false);
      }
    } catch (err) {
      setError(err.response.data.error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    selectedPlace ? getProperty() : setFoundProperty(null);
  }, [selectedPlace]);

  return (
    <Combobox
      as="div"
      value={selectedPlace}
      onChange={setSelectedPlace}
      nullable
    >
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        Address
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
          onChange={(event) =>
            getPlacePredictions({ input: event.target.value })
          }
          displayValue={(place) => place?.address}
          placeholder="Search for an address"
        />
        <div className="absolute top-0 right-0 flex h-full w-10 items-center justify-center">
          <AddressFeedback
            foundProperty={foundProperty}
            isLoading={isLoading}
          />
        </div>

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
                  description: address,
                  place_id: id,
                  structured_formatting: {
                    main_text: mainText,
                    secondary_text: secondaryText,
                  },
                }) => (
                  <Combobox.Option
                    key={id}
                    value={{ address }}
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

SearchValidate.propTypes = {
  selectedPlace: PropTypes.shape({
    address: PropTypes.string,
  }),
  setSelectedPlace: PropTypes.func.isRequired,
  foundProperty: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      address: PropTypes.string,
      reviews: PropTypes.arrayOf(PropTypes.string),
      _id: PropTypes.string,
    }),
  ]),
  setFoundProperty: PropTypes.func.isRequired,
};

SearchValidate.defaultProps = {
  selectedPlace: null,
  foundProperty: null,
};

export default SearchValidate;

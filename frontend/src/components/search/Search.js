import React, { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import clsx from "clsx";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import AddressFeedback from "../addressFeedback/AddressFeedback";

const Search = ({
  value,
  onChange,
  onBlur,
  ref,
  label,
  foundProperty,
  isLoading,
  variant,
}) => {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.REACT_APP_API_KEY,
      debounce: 500,
      options: {
        types: ["address"],
        componentRestrictions: { country: "uk" },
      },
    });

  return (
    <Combobox
      as="div"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      ref={ref}
      nullable
      className="w-full max-w-lg lg:max-w-xs"
    >
      <Combobox.Label
        className={
          label
            ? "mb-2 block text-sm font-medium leading-6 text-gray-900"
            : "sr-only"
        }
      >
        Search for an address
      </Combobox.Label>
      <div className="relative">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="z-10 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <Combobox.Input
            className={clsx(
              variant === "blur"
                ? "bg-white/5 py-2 pl-11 pr-3.5 text-white ring-white/10 backdrop-blur-md focus:ring-white"
                : "bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-gray-300 focus:ring-orange-500",
              "block w-full rounded-md border-0 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            )}
            onChange={(event) =>
              getPlacePredictions({ input: event.target.value })
            }
            placeholder="Search for an address"
          />
          <div className="absolute right-0 top-0 flex h-full w-10 items-center justify-center">
            <AddressFeedback
              foundProperty={foundProperty}
              isLoading={isLoading}
            />
          </div>
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
            {isPlacePredictionsLoading && (
              <div className="relative animate-pulse cursor-default select-none py-2 text-center text-gray-900">
                Loading...
              </div>
            )}

            {placePredictions.length === 0 && !isPlacePredictionsLoading && (
              <div className="relative cursor-default select-none py-2 text-center text-gray-900">
                No properties found
              </div>
            )}

            {placePredictions.length > 0 &&
              !isPlacePredictionsLoading &&
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
                    value={address}
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
              )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default Search;

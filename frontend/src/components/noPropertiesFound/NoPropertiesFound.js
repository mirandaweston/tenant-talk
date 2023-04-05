import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/20/solid";

const NoPropertiesFound = () => {
  return (
    <div className="relative isolate">
      <div className="absolute -z-10 grid h-fit w-full grid-cols-1 gap-6 blur-md sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-full rounded-lg bg-gray-300 p-6 pb-24">
            <div className="aspect-square w-full rounded-md bg-gray-400 opacity-50" />
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-xl sm:text-6xl">
              This property doesn't have any reviews just yet.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white drop-shadow-xl">
              Would you like to add one?
            </p>
            <div className="relative mx-auto mt-10 flex max-w-md">
              <Link
                to="/review/new"
                className="relative mx-auto inline-flex items-center gap-x-1.5 rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm drop-shadow-xl hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                New Review
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoPropertiesFound;

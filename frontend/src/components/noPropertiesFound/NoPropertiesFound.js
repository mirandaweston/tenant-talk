import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/20/solid";

const NoPropertiesFound = () => {
  return (
    <main>
      <div className="relative isolate h-screen overflow-hidden bg-zinc-900">
        <img
          src="https://source.unsplash.com/LmGT_iY-ykc"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                This property doesn't have any reviews just yet.
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Would you like to add one?
              </p>
              <div className="relative mx-auto mt-10 flex max-w-md">
                <Link
                  to="/review/new"
                  className="relative mx-auto inline-flex items-center gap-x-1.5 rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                  New Review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NoPropertiesFound;

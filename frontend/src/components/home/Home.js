import React from "react";
import SearchLanding from "../searchLanding/SearchLanding";
import HomeNav from "../homeNav/homeNav";

const Home = () => {
  return (
    <div className="relative isolate h-screen overflow-hidden bg-zinc-900">
      <img
        src="https://source.unsplash.com/nrSzRUWqmoI/5184x3456"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Welcome to Tenant Talk
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Search for an address to find reviews for your prospective home
            </p>
            <div className="relative mx-auto mt-10 flex max-w-md">
              <SearchLanding />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

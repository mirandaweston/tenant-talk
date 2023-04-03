import React from "react";
import SearchLanding from "../searchLanding/SearchLanding";

const Home = () => {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="p-6 lg:px-8" aria-label="Global">
          <span className="sr-only">Tenant Talk</span>
          <svg
            className="w-8 fill-orange-500"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1,0 h18 a1,1 0 0 1 1,1 v6 a1,1 0 0 1 -1,1 h-5 l-8 8 v3 a1,1 0 0 0 1,1 h6 a1,1 0 0 0 1,-1 v-3 l-8 -8 h-5 a1,1 0 0 1 -1,-1 v-6 a1,1 0 0 1 1,-1 z" />
          </svg>
        </nav>
      </header>

      <main>
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
                  Search for an address to find reviews for your prospective
                  home
                </p>
                <div className="relative mx-auto mt-10 flex max-w-md">
                  <SearchLanding />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

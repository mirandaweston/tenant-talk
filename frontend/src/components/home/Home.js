import React from "react";
import { Link } from "react-router-dom";
import Search from "../search/Search";

const Home = () => {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">Tenant Talk</span>
              <svg
                className="w-10 fill-orange-500"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1,0 h18 a1,1 0 0 1 1,1 v6 a1,1 0 0 1 -1,1 h-5 l-8 8 v3 a1,1 0 0 0 1,1 h6 a1,1 0 0 0 1,-1 v-3 l-8 -8 h-5 a1,1 0 0 1 -1,-1 v-6 a1,1 0 0 1 1,-1 z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-1 justify-end space-x-2">
            <Link
              to="/login"
              className="text-sm font-semibold leading-6 text-white"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-sm font-semibold leading-6 text-white"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <div className="relative isolate h-screen overflow-hidden bg-zinc-900">
          <img
            src="https://source.unsplash.com/h95mT1m9Zzs/5034x3696"
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
                  Search for an address or postcode to find reviews for your
                  prospective home
                </p>
                <div className="relative mx-auto mt-10 flex max-w-md">
                  <Search />
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

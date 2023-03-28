import React from "react";

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

          <div className="flex flex-1 justify-end">
            <div className="text-sm font-semibold leading-6 text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </div>
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
                <form className="relative mx-auto mt-10 flex max-w-md">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <input
                    id="search"
                    name="search"
                    type="search"
                    required
                    className="w-full rounded-full border-0 bg-white/5 p-5 text-white shadow-sm ring-1 ring-inset ring-white/10 backdrop-blur-md focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                    placeholder="Search by postcode"
                  />
                  <div className="absolute inset-y-0 right-0 flex p-1.5">
                    <button
                      type="submit"
                      className="rounded-full bg-orange-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

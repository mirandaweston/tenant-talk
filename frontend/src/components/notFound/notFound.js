import React from "react";

const NotFound = () => {
  return (
    <main className="relative isolate h-screen overflow-hidden bg-zinc-900">
      <img
        src="https://images.unsplash.com/photo-1576577610667-c9ea0ac983fd?ixlib=rb-4.0.3&ixid=MnwxM[…]90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-base font-semibold leading-8 text-white">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-white/70 sm:mt-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10 flex justify-center">
          <a href="/" className="text-sm font-semibold leading-7 text-white">
            <span aria-hidden="true">&larr;</span> Back to home
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;

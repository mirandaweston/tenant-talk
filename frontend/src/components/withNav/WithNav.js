import React from "react";
import { Outlet } from "react-router-dom";
import SearchNav from "../searchNav/SearchNav";

const WithNav = () => {
  return (
    <div className="h-screen bg-gray-100">
      {/* ⬇⬇⬇ NAVBAR GOES HERE ⬇⬇⬇ */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl p-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold leading-6 text-gray-900">
            Tenant Talk
          </h1>
          <SearchNav />
        </div>
      </header>
      {/* ⬆⬆⬆ NAVBAR GOES HERE ⬆⬆⬆ */}
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default WithNav;

import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import SearchNav from "../searchNav/SearchNav";

const navigation = [
  { name: "Properties", to: "/properties" },
  { name: "About", to: "/about" },
];

const NavBar = () => {
  const { user, token, dispatch } = useAuthContext();
  const { pathname } = useLocation();

  return (
    <div className="h-screen bg-gray-100">
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex px-2 lg:px-0">
                  <div className="flex shrink-0 items-center">
                    <Link to="/">
                      <svg
                        className="block h-8 w-auto fill-orange-500 lg:hidden"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1,0 h18 a1,1 0 0 1 1,1 v6 a1,1 0 0 1 -1,1 h-5 l-8 8 v3 a1,1 0 0 0 1,1 h6 a1,1 0 0 0 1,-1 v-3 l-8 -8 h-5 a1,1 0 0 1 -1,-1 v-6 a1,1 0 0 1 1,-1 z" />
                      </svg>
                      <svg
                        className="hidden h-8 w-auto fill-orange-500 lg:block"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1,0 h18 a1,1 0 0 1 1,1 v6 a1,1 0 0 1 -1,1 h-5 l-8 8 v3 a1,1 0 0 0 1,1 h6 a1,1 0 0 0 1,-1 v-3 l-8 -8 h-5 a1,1 0 0 1 -1,-1 v-6 a1,1 0 0 1 1,-1 z" />
                      </svg>
                    </Link>
                  </div>

                  <div className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4 ">
                    {navigation.map(({ name, to }) => (
                      <NavLink
                        key={name}
                        to={to}
                        className={({ isActive }) =>
                          clsx(
                            isActive ? "bg-gray-100" : " hover:bg-gray-50",
                            "rounded-md px-3 py-2 text-sm font-medium text-gray-900"
                          )
                        }
                        aria-current={({ isActive }) =>
                          isActive ? "page" : undefined
                        }
                      >
                        {name}
                      </NavLink>
                    ))}
                  </div>
                </div>

                {pathname === "/properties" && (
                  <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                    <SearchNav />
                  </div>
                )}

                {token ? (
                  <div className="ml-4 flex items-center">
                    <div className="hidden lg:ml-4 lg:flex lg:items-center">
                      <Link
                        to="/review/new"
                        className="relative inline-flex items-center gap-x-1.5 rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                      >
                        <PlusIcon
                          className="-ml-0.5 h-5 w-5"
                          aria-hidden="true"
                        />
                        New Review
                      </Link>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-4 shrink-0">
                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                          <span className="sr-only">Open user menu</span>
                          <span className="hidden lg:flex lg:items-center">
                            <span
                              className=" text-sm font-semibold leading-6 text-gray-900"
                              aria-hidden="true"
                            >
                              {user && user.firstName}
                            </span>
                            <ChevronDownIcon
                              className="ml-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/"
                                  className={clsx(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Your Profile
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="button"
                                  onClick={() => dispatch({ type: "logout" })}
                                  className={clsx(
                                    active ? "bg-gray-100" : "",
                                    "block w-full px-4 py-2 text-left text-sm text-gray-700"
                                  )}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:space-x-4 lg:ml-4 lg:flex lg:items-center">
                    <Link
                      to="/login"
                      className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                    >
                      Log in
                    </Link>

                    <Link
                      to="/signup"
                      className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                    >
                      Sign up
                    </Link>
                  </div>
                )}

                <div className="flex items-center space-x-4 lg:hidden">
                  {token && (
                    <Link
                      to="/review/new"
                      className="rounded-md bg-orange-500 p-2 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                    >
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  )}

                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-400">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              {({ close }) => (
                <>
                  {/* Navigation section */}
                  <div className="space-y-1 pb-3 pt-2">
                    {navigation.map(({ name, to }) => (
                      <NavLink
                        key={name}
                        to={to}
                        onClick={close}
                        className={({ isActive }) =>
                          clsx(
                            isActive
                              ? "bg-orange-50 text-orange-600"
                              : " hover:bg-gray-50 hover:text-gray-800",
                            "block py-2 pl-3 pr-4 text-base font-medium text-gray-600"
                          )
                        }
                        aria-current={({ isActive }) =>
                          isActive ? "page" : undefined
                        }
                      >
                        {name}
                      </NavLink>
                    ))}
                  </div>

                  {/* Profile section */}
                  <div className="border-t border-gray-200 py-3">
                    {token ? (
                      <>
                        <div className="mt-1 px-4">
                          <div className="text-base font-medium text-gray-800">
                            {user && user.firstName}
                          </div>
                          <div className="text-sm font-medium text-gray-500">
                            {user && user.email}
                          </div>
                        </div>
                        <div className="mt-3 space-y-1">
                          <Disclosure.Button
                            as="button"
                            onClick={() => dispatch({ type: "logout" })}
                            className="block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                          >
                            Sign out
                          </Disclosure.Button>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-1">
                        <Link
                          to="/login"
                          onClick={close}
                          className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        >
                          Log in
                        </Link>
                        <Link
                          to="/signup"
                          onClick={close}
                          className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        >
                          Sign up
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default NavBar;

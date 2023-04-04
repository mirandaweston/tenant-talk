import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const HomeNav = () => {
  return (
    <Menu>
      <Menu.Button
        data-testid="menu-button"
        className="inline-flex justify-center rounded-md  px-4 py-2 text-sm font-medium text-white hover:bg-black hover:bg-opacity-30 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
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
        <Menu.Items
          data-testid="menu-items"
          className="absolute right-0  w-36 origin-top-right rounded-md bg-black bg-opacity-20 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <Menu.Item data-testid="menu-item-login">
            {({ active }) => (
              <a
                className={`${
                  active && " bg-black bg-opacity-40"
                } group flex w-full items-center rounded-md p-2 text-sm`}
                href="/login"
              >
                Login
              </a>
            )}
          </Menu.Item>
          <Menu.Item data-testid="menu-item-properties">
            {({ active }) => (
              <a
                className={`${
                  active && "bg-black bg-opacity-40"
                } group flex w-full items-center rounded-md p-2 text-sm`}
                href="/properties"
              >
                Properties
              </a>
            )}
          </Menu.Item>
          <Menu.Item data-testid="menu-item-about">
            {({ active }) => (
              <a
                className={`${
                  active && "bg-black bg-opacity-40"
                } group flex w-full items-center rounded-md p-2 text-sm`}
                href="/about"
              >
                About
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default HomeNav;

import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";

const WithNav = () => {
    return (
        <div className="h-screen bg-gray-100">
            <NavBar />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default WithNav;
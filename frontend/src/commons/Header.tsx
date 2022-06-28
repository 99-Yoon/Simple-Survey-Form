import React from "react";
import { Link } from "react-router-dom";

export const Header = () => (
  <div className="bg-white border-b-2 border-b-themeColor px-2 sm:px-4 py-2.5">
    <div className="container flex flex-wrap justify-between items-center mx-auto">
      <Link to="/" className="font-bold text-2xl text-themeColor">
        Simple Survey Form
      </Link>
      <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
        <Link
          to="/login"
          className="whitespace-nowrap font-bold text-gray-600 hover:text-themeColor mx-1 py-2 px-3 rounded-md"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="whitespace-nowrap font-bold text-white hover:bg-blue-500 mx-1 py-2 px-3 bg-themeColor rounded-md "
        >
          Sign Up
        </Link>
      </div>
    </div>
  </div>
);

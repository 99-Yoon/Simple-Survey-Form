import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/auth.context";

export const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="bg-white border-b-2 border-b-themeColor px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="font-bold text-2xl text-themeColor">
          Simple Survey Form
        </Link>
        <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
          {user.isLoggedIn ? (
            <div className="">
              <button
                onClick={() => logout()}
                className="whitespace-nowrap font-bold text-gray-600 hover:text-themeColor mx-1 py-2 px-3 rounded-md"
              >
                로그아웃
              </button>
              {location.pathname === "/profile" ? (
                ""
              ) : (
                <Link
                  to="/profile"
                  className="whitespace-nowrap font-bold text-gray-600 hover:text-themeColor mx-1 py-2 px-3 rounded-md"
                >
                  프로필
                </Link>
              )}
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="whitespace-nowrap font-bold text-gray-600 hover:text-themeColor mx-1 py-2 px-3 rounded-md"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="whitespace-nowrap font-bold text-white hover:bg-blue-500 mx-1 py-2 px-3 bg-themeColor rounded-md "
              >
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth.context";

export const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b-2 border-b-themeColor px-2 sm:px-4 py-2.5">
      <div className="container flex flex-col md:flex-row flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="font-bold text-2xl text-themeColor">
          Simple Survey Form
        </Link>
        <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
          {user.isLoggedIn ? (
            <div className="pt-2">
              <button
                onClick={() => logout(() => navigate("/"))}
                className="font-bold text-gray-600 hover:text-themeColor mx-1 py-2 px-3 rounded-md"
              >
                로그아웃
              </button>
              <Link to="/profile">
                <button className="font-bold text-gray-600 hover:text-themeColor mx-1 py-2 px-3 rounded-md">
                  프로필
                </button>
              </Link>
            </div>
          ) : (
            <div className="pt-2">
              <Link to="/login">
                <button className="font-bold text-gray-600 hover:text-themeColor mx-1 py-2 px-3 rounded-md">
                  로그인
                </button>
              </Link>
              <Link to="/signup">
                <button className="font-bold text-white hover:bg-blue-500 mx-1 py-2 px-3 bg-themeColor rounded-md ">
                  회원가입
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import { LoginIcon, LogoutIcon, SurveyIcon, UserIcon } from "../icons";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-white border-b-2 border-b-themeColor py-3.5">
      <Link to="/" className="font-bold text-2xl text-themeColor px-4">
        Simple Survey
      </Link>
      <div className="hidden md:flex">
        {user.isLoggedIn ? (
          <div>
            <Link to="/surveys">
              <button className="font-bold text-gray-600 hover:text-themeColor mx-1 py-2 px-3 rounded-md">
                프로필
              </button>
            </Link>
            <button
              onClick={() => logout(() => navigate("/"))}
              className="font-bold text-gray-600 hover:text-themeColor mx-1 py-2 px-3 rounded-md"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button className="font-bold text-gray-600 hover:text-themeColor mx-1 py-2 px-3 rounded-md">
                로그인
              </button>
            </Link>
            <Link to="/signup">
              <button className="font-bold text-white hover:bg-themeColor2 mx-1 py-2 px-3 bg-themeColor rounded-md ">
                회원가입
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="md:hidden">
        {user.isLoggedIn ? (
          <div className="flex px-4">
            <Link to="/surveys">
              <UserIcon className="h-7 w-7 mx-4" />
            </Link>
            <button onClick={() => logout(() => navigate("/"))}>
              <LogoutIcon className="h-7 w-7" />
            </button>
          </div>
        ) : (
          <div className="flex px-4">
            <Link to="/login">
              <LoginIcon className="h-7 w-7" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

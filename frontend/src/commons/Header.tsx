import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth.context";
import { UserIcon } from "../icons";

export const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);

  const handleHeaderClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="bg-white border-b-2 border-b-themeColor px-2 sm:px-4 py-3.5">
      <div className="container flex flex-wrap place-content-center mx-auto">
        <Link
          to="/"
          className="font-bold text-2xl text-themeColor justify-center"
        >
          Simple Survey Form
        </Link>
        <div className="absolute right-4 top-2 hidden md:flex items-center justify-end md:flex-1">
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

        <button
          className="flex md:hidden w-8 h-8 rounded-full absolute top-4 right-5"
          onClick={handleHeaderClick}
        >
          <UserIcon />
          {isClicked ? (
            user.isLoggedIn ? (
              <div className="fixed top-14 justify-center right-1 w-48 h-40 bg-themeColor3 flex flex-col rounded-lg place-content-between">
                <div className="p-1 place-self-center">안녕하세요.</div>
                <div className="p-1 place-self-center">
                  만들어진 설문을 확인하시려면 프로필을 눌러주세요.
                </div>
                <div className="flex border-themeColor border-t-2">
                  <Link to="/login">
                    <div
                      className="p-1 w-24 border-r-2 border-themeColor text-center text-l text-gray-600 hover:text-themeColor"
                      onClick={() => logout(() => navigate("/"))}
                    >
                      로그아웃
                    </div>
                  </Link>
                  <Link to="/profile">
                    <div className="p-1 w-24 text-center text-l text-gray-600 hover:text-themeColor">
                      프로필
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="fixed top-14 right-1 w-48 h-40 bg-themeColor3 flex flex-col  place-content-between">
                <div className="p-1">로그아웃 상태입니다.</div>
                <div className="p-1">설문지를 만드시려면 로그인해주세요.</div>
                <div className="flex ">
                  <Link to="/login">
                    <div className="p-1 w-24 justify-center text-l text-gray-600 hover:text-themeColor">
                      로그인
                    </div>
                  </Link>
                  <Link to="/signup">
                    <div className="p-1 w-24 justify-center text-l text-gray-600 hover:text-themeColor">
                      회원가입
                    </div>
                  </Link>
                </div>
              </div>
            )
          ) : (
            <></>
          )}
        </button>
      </div>
    </div>
  );
};

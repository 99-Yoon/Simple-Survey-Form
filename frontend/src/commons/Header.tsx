import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth.context";
import { UserIcon } from "../icons";

export const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  const [isClicked, setIsClicked] = useState(false);

  const handleHeaderClick = () => {
    setIsClicked(!isClicked);
  };

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-white border-b-2 border-b-themeColor px-2 sm:px-4 py-3.5">
      <div className="container flex flex-wrap place-content-center mx-auto">
        <Link to="/" className="font-bold text-2xl text-themeColor">
          Simple Survey Form
        </Link>

        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
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
              <div className="fixed top-14 right-1 w-20 bg-white flex flex-col border-2 border-themeColor">
                <Link to="/login">
                  <button
                    className="text-gray-600 hover:text-themeColor"
                    onClick={() => logout(() => navigate("/"))}
                  >
                    로그아웃
                  </button>
                </Link>
                <Link to="/profile">
                  <button className="text-gray-600 hover:text-themeColor">
                    프로필
                  </button>
                </Link>
              </div>
            ) : (
              <div className="fixed top-14 right-1 w-20 bg-white flex flex-col border-2 border-themeColor">
                <Link to="/login">
                  <button>
                    <div className="text-gray-600 hover:text-themeColor">
                      로그인
                    </div>
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="text-gray-600 hover:text-themeColor">
                    회원가입
                  </button>
                </Link>
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

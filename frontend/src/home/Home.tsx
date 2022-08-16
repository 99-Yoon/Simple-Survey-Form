import React, { FormEvent } from "react";
import { useAuth } from "../auth/auth.context";
import homeImg from "../icons/homeImg.png";

export const Home = () => {
  const { user } = useAuth();

  function clickHome(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!user.isLoggedIn) {
      console.log("버튼");
      location.href = "/login";
    } else {
      location.href = "/surveys/profile";
    }
  }

  return (
    <div className="flex flex-col place-items-center">
      <div className="justify-end text-center text-2xl md:text-3xl text-black h-16 mt-12">
        가장 쉽게 설문지를 만드세요!
      </div>
      <div className="flex flex-col place-items-center container">
        <div className="flex h-14 w-28 items-center border-2 font-bold text-black bg-gray-200 hover:bg-themeColor rounded-lg ">
          <button
            type="button"
            className="text-center text-xl h-full w-28 font-bold hover:text-white place-items-center"
            onClick={clickHome}
          >
            +
          </button>
        </div>
        <p className="text-center text-xl text-black my-3">Create now!</p>
      </div>
      <div className="flex mt-5 md:px-48 bg-themeColor">
        <img src={homeImg} className="m-3" />
      </div>
    </div>
  );
};

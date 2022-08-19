import React from "react";
import { Link } from "react-router-dom";
import homeImg from "../icons/homeImg.png";

export const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-2xl md:text-3xl text-black mt-12">
        가장 쉽게 설문지를 만드세요!
      </div>
      <Link
        to={"/surveys"}
        className="flex justify-center items-center my-6 h-12 w-28 border-2 font-bold text-black hover:text-white bg-gray-200 hover:bg-themeColor text-xl rounded-lg"
      >
        +
      </Link>
      <p className="text-center text-xl text-black mb-3">Create now!</p>
      <div className="flex mt-5 md:px-48 bg-themeColor">
        <img src={homeImg} className="m-3" />
      </div>
    </div>
  );
};

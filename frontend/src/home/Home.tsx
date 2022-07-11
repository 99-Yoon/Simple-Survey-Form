import React, { FormEvent } from "react";
import { useAuth } from "../auth/auth.context";

export const Home = () => {
  const { user } = useAuth();

  function clickHome(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!user.isLoggedIn) {
      console.log("버튼");
      location.href = "/login";
    } else {
      location.href = "/profile";
    }
  }

  return (
    <div className="flex flex-col place-items-center">
      <div className="justify-end text-center text-3xl text-black h-16 mt-12">
        가장 쉽게 설문지를 만드세요!
      </div>
      <div className="flex flex-col place-items-center container">
        <div className="flex h-14 w-28 items-center border-2 border-themeColor font-bold text-black bg-gray-200 hover:bg-themeColor rounded-lg ">
          <button
            type="button"
            className="text-center h-full w-28 font-bold text-black place-items-center mb-3"
            onClick={clickHome}
          >
            +
          </button>
        </div>
        <p className="text-center text-xl text-black mt-3">Create now!</p>
      </div>
      <div className="flex justify-center">
        <img
          src="https://3hbgf23vu0wr11wkpae5igwe-wpengine.netdna-ssl.com/wp-content/uploads/2021/04/SurveyExample_v3.jpg"
          className="object-scale-down justify-center"
        />
      </div>
    </div>
  );
};

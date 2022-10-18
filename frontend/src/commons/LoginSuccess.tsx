import React from "react";
import { Link } from "react-router-dom";

export const LoginSuccess = () => {
  return (
    <div className="flex flex-col mt-10 justify-center text-center text-5xl">
      <h1 className="text-4xl">로그인이 완료되었습니다.</h1>
      <Link to={"/"} className="mt-4">
        홈으로
      </Link>
    </div>
  );
};

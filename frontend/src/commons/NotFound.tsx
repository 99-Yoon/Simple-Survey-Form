import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col mt-10 justify-center text-center text-5xl">
      <h1 className="text-4xl">페이지를 찾을 수 없습니다.</h1>
      <Link to={"/"} className="mt-4">
        홈으로
      </Link>
    </div>
  );
};

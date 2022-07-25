import React from "react";
import { useNavigate } from "react-router-dom";

export const CompleteSurvey = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col place-items-center mt-24">
      <div className="flex flex-col container place-items-center place-content-center space-y-5 space-x-2 w-full h-56">
        <p className="text-3xl font-bold">설문조사가 제출되었습니다</p>
        <p>응답이 완료되었습니다</p>
        <button
          className="flex place-content-start rounded-lg bg-themeColor w-20 h-10 text-center py-2 px-4 text-white"
          type="button"
          onClick={() => navigate("/")}
        >
          홈으로
        </button>
      </div>
    </div>
  );
};

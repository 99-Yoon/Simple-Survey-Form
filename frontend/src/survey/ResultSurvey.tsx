import React from "react";

export const ResultSurvey = () => {
  return (
    <div className="flex flex-col place-items-center">
      <div className="flex flex-col container place-items-center mt-4">
        <div className="font-bold text-4xl text-center m-2 border-b-2">
          설문지 제목
        </div>
        <div className="font-bold text-1xl text-center m-2 resize-none">
          설문조사 설명
        </div>
      </div>
      <div className="w-11/12 h-16 rounded border-2 hover:border-themeColor">
        1번 질문
      </div>
    </div>
  );
};

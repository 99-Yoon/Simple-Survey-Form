import React from "react";
import { Questions } from "./Questions";
import { useQuestion } from "./question.context";

export const Page = () => {
  const { handleSurvey, handleSubmit } = useQuestion();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col place-items-center">
          <div className="flex flex-col container place-items-center mt-4">
            <input
              type="text"
              name="title"
              className="font-bold text-4xl text-center m-2 border-b-2"
              placeholder="설문지 제목"
              onChange={handleSurvey}
            ></input>
            <input
              type="text"
              name="comment"
              className="font-bold text-1xl text-center m-2 resize-none"
              placeholder="설문조사에 대한 설명을 입력해주세요"
              size={50}
              onChange={handleSurvey}
            ></input>
          </div>
          <Questions />
          <div>
            <button
              type="submit"
              className="border bg-themeColor my-5 py-2 px-3 font-bold text-white"
            >
              설문조사 생성
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

import React, { useState } from "react";
import { Questions } from "./Questions";
import { QuestionProvider } from "./question.context";

export const CreateSurveyForm = () => {
  const [survey, setSurvey] = useState();
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <>
      <QuestionProvider>
        <div className="flex flex-col place-items-center">
          <div className="flex flex-col container place-items-center mt-4">
            <input
              type="text"
              className="font-bold text-4xl text-center m-2 border-b-2"
              placeholder="설문지 제목"
            ></input>
            <textarea
              className="font-bold text-1xl text-center m-2 resize-none"
              placeholder="설문조사에 대한 설명을 입력해주세요"
              rows={2}
              cols={60}
            ></textarea>
          </div>
          <Questions />
          <div>
            <button className="border bg-themeColor my-5 py-2 px-3 font-bold text-white">
              설문조사 생성
            </button>
          </div>
        </div>
      </QuestionProvider>
    </>
  );
};

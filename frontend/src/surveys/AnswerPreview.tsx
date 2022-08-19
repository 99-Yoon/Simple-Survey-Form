import React from "react";
import { SpinnerIcon } from "../icons";
import { useSurvey } from "../layouts";
import { AQuestion } from "./AQuestion";

export const AnswerPreview = () => {
  const { survey } = useSurvey();

  if (!survey) {
    return (
      <div className="flex justify-center mt-5">
        <SpinnerIcon className="animate-spin h-10 w-10 mr-1 bg-white text-slate-500" />
      </div>
    );
  }

  // 다음은 순서가 중요합니다. survey가 늦게 생성될 수 있습니다.
  const questions = survey.questions;

  return (
    <form>
      <div className="flex flex-col place-items-center">
        <div className="flex flex-col container place-items-center mt-4">
          <p className="font-bold text-4xl text-center m-2">{survey.title}</p>
          <p className="font-bold text-1xl text-center m-2">{survey.comment}</p>
          {questions.map((question) => {
            return (
              <AQuestion
                key={question._id}
                question={question}
                answer={{
                  question: question,
                  surveyId: "",
                  guestId: "",
                  requiredCheck: true,
                  content: {},
                }}
              />
            );
          })}
          <div>
            <button
              type="submit"
              disabled
              className="rounded bg-themeColor disabled:bg-slate-300 my-5 py-2 px-5 font-bold text-white"
            >
              제출하기
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

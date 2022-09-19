import React from "react";
import { IQuestionData, IAnswer } from "../types";
import { getAnswerElementByType } from "../helpers";

type Props = {
  question: IQuestionData;
  answer: IAnswer;
};

export const AQuestion = ({ question, answer }: Props) => {
  return (
    <div className="w-4/5 border-2 border-themeColor m-3 p-4 rounded-lg">
      <div className="md:flex w-full flex-row-reverse my-1 justify-between">
        {question.isRequired ? (
          <div className="text-xs text-red-600 justify-end">* 필수질문</div>
        ) : (
          <div></div>
        )}
        <div className="md:text-xl text-base font-bold">{question.title}</div>
      </div>
      <div className="md:text-base text-sm w-11/12 text-slate-500">
        {question.comment}
      </div>
      {getAnswerElementByType(question, answer)}
    </div>
  );
};

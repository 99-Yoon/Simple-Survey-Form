import React from "react";
import { IQuestionData, IAnswer } from "../types";
import { getAnswerElementByType } from "../helpers";

type Props = {
  question: IQuestionData;
  answer: IAnswer;
};

export const AQuestion = ({ question, answer }: Props) => {
  return (
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-4 rounded-lg">
      <div className="flex my-1 w-11/12 place-content-between items-center">
        <div className="text-xl font-bold">{question.title}</div>
        {question.isRequired ? (
          <div className="text-xs text-red-600">* 필수질문</div>
        ) : (
          <></>
        )}
      </div>
      <div className="w-11/12 text-slate-500">{question.comment}</div>
      {getAnswerElementByType(question, answer)}
    </div>
  );
};

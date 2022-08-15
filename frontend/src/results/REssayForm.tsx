import React from "react";
import { IQuestionData } from "../types";

type Props = {
  question: IQuestionData;
};

export const REssayForm = ({ question }: Props) => {
  return (
    <div className="m-5">
      {question.answers.map((answer: any, index: number) => (
        <div key={index} className="font-bold">
          {answer}
        </div>
      ))}
    </div>
  );
};

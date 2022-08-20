import React from "react";
import { IQuestionData } from "../types";

type Props = {
  question: IQuestionData;
  answers: any;
};

export const REssay = ({ question, answers }: Props) => {
  return (
    <div className="m-5">
      {answers.map((answer: any, index: number) => (
        <div key={index} className="font-bold">
          {answer}
        </div>
      ))}
    </div>
  );
};

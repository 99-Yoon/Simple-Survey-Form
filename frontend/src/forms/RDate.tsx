import React from "react";
import { IQuestionData } from "../types";

type Props = {
  question: IQuestionData;
  answers: any;
};

export const RDate = ({ question, answers }: Props) => {
  return (
    <div className="m-5">
      {answers.map((answer: any) => (
        <div key={answer} className="font-bold">
          {answer}
        </div>
      ))}
    </div>
  );
};

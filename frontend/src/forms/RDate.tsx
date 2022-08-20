import React from "react";
import { IQuestionData } from "../types";

type Props = {
  question: IQuestionData;
};

export const RDate = ({ question }: Props) => {
  return (
    <div className="m-5">
      {question.answers.map((answer: any) => (
        <div key={answer} className="font-bold">
          {answer}
        </div>
      ))}
    </div>
  );
};

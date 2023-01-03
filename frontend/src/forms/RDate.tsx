import React from "react";
import { IQuestionData } from "../types";
import chartImg2 from "../icons/chartImg2.png";

type Props = {
  question: IQuestionData;
};

export const RDate = ({ question }: Props) => {
  return (
    <div className="m-5">
      <img src={chartImg2} />
      {question.answers.map((answer: any, index: number) => (
        <div key={index} className="font-bold">
          {answer}
        </div>
      ))}
    </div>
  );
};

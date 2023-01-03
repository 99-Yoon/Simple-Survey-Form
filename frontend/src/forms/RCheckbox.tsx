import React from "react";
import { IQuestionData } from "../types";
import chartImg2 from "../icons/chartImg2.png";

type Props = {
  question: IQuestionData;
};

export const RCheckbox = ({ question }: Props) => {
  const result = question.answers.flat().reduce((acc: any, cur: any) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});
  console.log(result);

  return (
    <div className="m-5">
      <img src={chartImg2} />
      {question.content.choices.map((choice: any, index: number) => (
        <div key={index} className="">
          <span className="font-bold">{choice.text}</span>
          <span className="ml-3">
            - {result[choice.text] ? result[choice.text] : 0}
          </span>
        </div>
      ))}
    </div>
  );
};

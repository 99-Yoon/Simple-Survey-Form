import React from "react";
import { IQuestionData } from "../types";

type Props = {
  question: IQuestionData;
  answers: any;
};

export const RDropdown = ({ question, answers }: Props) => {
  const result = answers.reduce((acc: any, cur: any) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="m-5">
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

import React from "react";
import { IQuestionData } from "../types";

type Props = {
  question: IQuestionData;
  answers: any;
};

export const RRating = ({ question, answers }: Props) => {
  const result = answers.reduce((acc: any, cur: any) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});
  console.log(result);
  return (
    <div className="m-5">
      <div>{question.content.minRateDescription}</div>
      {question.content.choices.map((choice: any) => (
        <div key={choice.text} className="">
          <span className="font-bold">{choice.text}</span>
          <span className="ml-3">
            - {result[choice.text] ? result[choice.text] : 0}
          </span>
        </div>
      ))}
      <div>{question.content.maxRateDescription}</div>
    </div>
  );
};

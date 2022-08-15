import React from "react";
import { IQuestionData } from "../types";

type Props = {
  question: IQuestionData;
};

export const RDateForm = ({ question }: Props) => {
  return (
    <div className="m-5">
      {question.answers.map((answer: any) => (
        <div className="font-bold">{answer}</div>
      ))}
    </div>
  );
};

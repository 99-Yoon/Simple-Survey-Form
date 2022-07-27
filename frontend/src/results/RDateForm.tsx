import React from "react";
import { BasicQuestionType } from "../types";

type Props = {
  question: BasicQuestionType;
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

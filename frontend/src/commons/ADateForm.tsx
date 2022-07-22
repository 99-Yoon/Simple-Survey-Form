import React, { useState } from "react";
import { DateType, AnswersType } from "../types";
type Props = {
  element: DateType;
  answerQuestion: any | undefined;
};
export const ADateForm = ({ element, answerQuestion }: Props) => {
  const [answer, setAnswer] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    answerQuestion.answer = value;
    setAnswer(value);
    if (answerQuestion.answer) {
      answerQuestion.requiredCheck = true;
    } else {
      answerQuestion.requiredCheck = false;
    }
    console.log(answerQuestion);
  };
  return (
    <div className="justify-start w-11/12 m-3 py-4">
      <input type="date" onChange={handleChange}></input>
    </div>
  );
};

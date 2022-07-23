import React, { useState } from "react";
import { AnswerProps, AnswerQuestionType, EssayType } from "../types";

export const AEssayForm = ({ element, answerQuestion }: AnswerProps) => {
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
    <div className="flex mt-3 w-full justify-center">
      <input
        type="text"
        className="border w-11/12 h-36 my-3"
        id={element._id}
        onChange={handleChange}
        value={answer}
      ></input>
    </div>
  );
};

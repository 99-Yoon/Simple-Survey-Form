import React, { useState } from "react";
import { IAnswerProps } from "../types";

export const AEssay = ({ element, answer: answerQuestion }: IAnswerProps) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    answerQuestion.content = value;
    setAnswer(value);
    if (answerQuestion.content) {
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
        className="border w-11/12 h-24 my-3"
        id={element._id}
        onChange={handleChange}
        value={answer}
      ></input>
    </div>
  );
};

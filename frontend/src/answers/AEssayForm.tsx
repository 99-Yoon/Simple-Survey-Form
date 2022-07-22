import React, { useState } from "react";
import { AnswerProps } from "../types";

export const AEssayForm = ({ element, handleAnswer, answers }: AnswerProps) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    answers && (answers.answer = value);
    setAnswer(value);
    handleAnswer();
  };
  return (
    <div className="flex mt-3 w-full justify-center">
      <input
        type="text"
        className="border w-11/12 h-36 my-3"
        id={element._id}
        onChange={handleChange}
        value={answer}
        required={element.isRequired}
      ></input>
    </div>
  );
};

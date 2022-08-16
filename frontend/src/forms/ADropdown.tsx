import React, { useState } from "react";
import { IDropdown, IAnswerProps } from "../types";

export const ADropdown = ({
  element,
  answer: answerQuestion,
}: IAnswerProps) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
    <div className="flex flex-col container w-11/12 h-auto m-3 py-3">
      <select
        className="py-2 w-48 hover:bg-gray-200 border border-black rounded"
        onChange={handleChange}
      >
        {element.content.choices.map((choice) => (
          <option key={choice.value} value={choice.text}>
            {choice.text}
          </option>
        ))}
      </select>
    </div>
  );
};

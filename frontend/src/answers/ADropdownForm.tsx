import React, { useState } from "react";
import { DropdownType, AnswerProps } from "../types";

interface Props extends AnswerProps {
  element: DropdownType;
  answerQuestion: any | undefined;
}

export const ADropdownForm = ({ element, answerQuestion }: Props) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
    <div className="flex flex-col container w-11/12 h-auto m-3 py-3">
      <select
        className="py-2 w-48 hover:bg-gray-200 border border-black rounded"
        onChange={handleChange}
      >
        {element.content.choices.map((choice) => (
          <option value={choice.text}>{choice.text}</option>
        ))}
      </select>
    </div>
  );
};

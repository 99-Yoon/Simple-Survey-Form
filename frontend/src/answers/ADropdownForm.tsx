import React, { useState } from "react";
import { DropdownType, AnswerProps } from "../types";

interface Props extends AnswerProps {
  element: DropdownType;
}

export const ADropdownForm = ({ element, handleAnswer, answers }: Props) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    answers && (answers.answer = value);
    setAnswer(value);
    handleAnswer();
  };
  return (
    <div className="flex flex-col container w-4/5 h-auto items-center m-3 py-3">
      <select
        className="py-2 hover:bg-themeColor bg-gray-200 rounded"
        onChange={handleChange}
        required={element.isRequired}
      >
        {element.content.choices.map((choice) => (
          <option value={choice.text}>{choice.text}</option>
        ))}
      </select>
    </div>
  );
};

import React, { useState } from "react";
import { DropdownType, AnswerType } from "../types";

type Props = {
  element: DropdownType;
  response: AnswerType;
  handleAnswer: () => void;
};

export const ADropdownForm = ({ element, handleAnswer, response }: Props) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    response.answers.map((a) => {
      if (a.questionId === element._id) {
        a.answer = value;
      }
    });
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

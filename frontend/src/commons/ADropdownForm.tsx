import React, { useState } from "react";
import { DropdownType, AnswersType } from "../types";

type Props = {
  element: DropdownType;
  answers: AnswersType | undefined;
  handleAnswer: () => void;
};

export const ADropdownForm = ({ element, handleAnswer, answers }: Props) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    // response.answers.map((a) => {
    //   if (a.questionId === element._id) {
    //     a.answer = value;
    //   }
    // });
    answers && (answers.answer = value);
    setAnswer(value);
    handleAnswer();
  };
  return (
    <div className="flex flex-col container w-11/12 h-auto m-3 py-3">
      <select
        className="py-2 w-48 hover:bg-gray-200 border border-black rounded"
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

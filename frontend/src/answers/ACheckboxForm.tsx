import React, { useState } from "react";
import { CheckboxType, AnswersType, AnswerProps } from "../types";

interface Props extends AnswerProps {
  element: CheckboxType;
}

export const ACheckboxForm = ({ element, answers, handleAnswer }: Props) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    answers && (answers.answer = value);
    setAnswer(value);
    handleAnswer();
  };
  return (
    <div className="flex w-full gap-2 justify-around my-3">
      {element.content.choices.map((choice) => (
        <div>
          <input
            className="mr-2"
            type="checkbox"
            value={choice.text}
            onChange={handleChange}
            required={element.isRequired}
          />
          <label className="text-lg">{choice.text}</label>
        </div>
      ))}
    </div>
  );
};

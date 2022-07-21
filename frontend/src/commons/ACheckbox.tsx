import React, { useState } from "react";
import { CheckboxType, AnswerType } from "../types";

type Props = {
  element: CheckboxType;
  response: AnswerType;
  handleAnswer: () => void;
};

export const ACheckboxForm = ({ element, response, handleAnswer }: Props) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="flex w-full gap-4 justify-around my-3">
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

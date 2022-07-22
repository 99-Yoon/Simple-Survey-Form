import React, { useState } from "react";
import { CheckboxType, AnswersType } from "../types";

type Props = {
  element: CheckboxType;
  answerQuestion: any | undefined;
};

export const ACheckboxForm = ({ element, answerQuestion }: Props) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    if (answerQuestion.answer) {
      if (answerQuestion.answer.find((a: any) => a === value)) {
        const newList = answerQuestion.answer.filter((a: any) => a !== value);
        answerQuestion.answer = newList;
        if (answerQuestion.answer.length) {
          answerQuestion.requiredCheck = true;
        } else {
          answerQuestion.requiredCheck = false;
        }
      } else {
        answerQuestion.answer.push(value);
        answerQuestion.requiredCheck = true;
      }
    } else {
      answerQuestion.answer = [];
      answerQuestion.answer.push(value);
      answerQuestion.requiredCheck = true;
    }
    setAnswer(value);

    console.log(answerQuestion);
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
          />
          <label className="text-lg">{choice.text}</label>
        </div>
      ))}
    </div>
  );
};

import React, { useState } from "react";
import { IRadio, AnswerProps } from "../types";

interface Props extends AnswerProps {
  element: IRadio;
}

export const ARadioForm = ({ element, answerQuestion }: Props) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="flex w-full gap-2 justify-center my-3">
      {element.content.choices.map((choice) => (
        <div key={choice.value} className="mx-2">
          <input
            className="mr-2"
            type="radio"
            id={choice.text}
            name={element._id}
            onChange={handleChange}
            value={choice.text}
          ></input>
          <label className="text-lg" id={choice.text}>
            {choice.text}
          </label>
        </div>
      ))}
    </div>
  );
};

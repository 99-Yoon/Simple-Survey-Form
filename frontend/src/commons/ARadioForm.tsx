import React, { useState } from "react";
import { RadioType, AnswersType } from "../types";

type Props = {
  element: RadioType;
  answerQuestion: any | undefined;
};

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
    <div className="flex w-full gap-2 justify-around my-3">
      {element.content.choices.map((choice) => (
        <div>
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

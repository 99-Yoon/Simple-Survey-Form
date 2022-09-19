import React, { useState } from "react";
import { IRadio, IAnswerProps } from "../types";

export const ARadio = ({ element, answer: answerQuestion }: IAnswerProps) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="md:flex gap-2 justify-center my-3">
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
          <label className="md:text-lg text-base" id={choice.text}>
            {choice.text}
          </label>
        </div>
      ))}
    </div>
  );
};

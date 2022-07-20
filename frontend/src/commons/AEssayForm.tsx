import React, { useState } from "react";
import { EssayType, AnswerType } from "../types";

type Props = {
  element: EssayType;
  response: AnswerType;
  handleAnswer: () => void;
};

export const AEssayForm = ({ element, handleAnswer, response }: Props) => {
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
    <div className="flex mt-3 w-full justify-center">
      <input
        type="text"
        className="border w-11/12 h-36 my-3"
        id={element._id}
        onChange={handleChange}
        value={answer}
      ></input>
    </div>
  );
};

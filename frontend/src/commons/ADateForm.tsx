import React, { useState } from "react";
import { DateType, AnswerType } from "../types";
type Props = {
  element: DateType;
  response: AnswerType;
  handleAnswer: () => void;
};
export const ADateForm = ({ element, response, handleAnswer }: Props) => {
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
    <div className="justify-start w-11/12 m-3 py-4">
      <input
        type="date"
        onChange={handleChange}
        required={element.isRequired}
      ></input>
    </div>
  );
};

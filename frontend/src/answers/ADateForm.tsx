import React, { useState } from "react";
import { AnswerProps } from "../types";

export const ADateForm = ({ element, answers, handleAnswer }: AnswerProps) => {
  const [answer, setAnswer] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="justify-start w-11/12 m-3 py-4">
      <input
        type="date"
        onChange={handleChange}
        required={element.isRequired}
      ></input>
    </div>
  );
};

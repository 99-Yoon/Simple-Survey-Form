import React, { useState } from "react";
import { DateType, AnswersType } from "../types";
type Props = {
  element: DateType;
  answers: AnswersType;
  handleAnswer: () => void;
};
export const ADateForm = ({ element, answers, handleAnswer }: Props) => {
  const [answer, setAnswer] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    // response.answers.map((a) => {
    //   if (a.questionId === element._id) {
    //     a.answer = value;
    //   }
    // });
    answers[element._id] = value;
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

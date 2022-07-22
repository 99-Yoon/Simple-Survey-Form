import React, { useState } from "react";
import { RadioType, AnswersType } from "../types";

type Props = {
  element: RadioType;
  answers: AnswersType | undefined;
  handleAnswer: () => void;
};

export const ARadioForm = ({ element, answers, handleAnswer }: Props) => {
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
            required={element.isRequired}
          ></input>
          <label className="text-lg" id={choice.text}>
            {choice.text}
          </label>
        </div>
      ))}
    </div>
  );
};

import React, { useState } from "react";
import { IRating, AnswerProps } from "../types";

interface Props extends AnswerProps {
  element: IRating;
}

export const ARatingForm = ({ element, answerQuestion }: Props) => {
  const [selectedchoice, setSelectedchoice] = useState("");
  const [answer, setAnswer] = useState("");

  function buttonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { name } = event.currentTarget;
    answerQuestion.answer = name;
    setAnswer(name);
    setSelectedchoice(event.currentTarget.name);
    if (answerQuestion.answer) {
      answerQuestion.requiredCheck = true;
    } else {
      answerQuestion.requiredCheck = false;
    }
    console.log(answerQuestion);
  }
  return (
    <div className="flex w-full justify-center my-3 overflow-x-auto">
      <label className="mt-3">{element.content.minRateDescription}</label>
      {element.content.choices.map((choice) => (
        <div className="flex gap-4 mx-1" key={choice.value}>
          <button
            type="button"
            className="border border-themeColor rounded-full w-12 h-12 text-center hover:bg-slate-300"
            name={choice.text}
            onClick={buttonClick}
            style={{
              backgroundColor:
                selectedchoice === choice.text ? "#58ACFA" : "white",
            }}
          >
            {choice.text}
          </button>
        </div>
      ))}
      <label className="mt-3">{element.content.maxRateDescription}</label>
    </div>
  );
};

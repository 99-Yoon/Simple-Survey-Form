import React, { useState } from "react";
import { IRating, IAnswerProps } from "../types";

export const ARating = ({ element, answer: answerQuestion }: IAnswerProps) => {
  const [selectedchoice, setSelectedchoice] = useState("");
  const [answer, setAnswer] = useState("");

  function buttonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { name } = event.currentTarget;
    answerQuestion.content = name;
    setAnswer(name);
    setSelectedchoice(event.currentTarget.name);
    if (answerQuestion.content) {
      answerQuestion.requiredCheck = true;
    } else {
      answerQuestion.requiredCheck = false;
    }
    console.log(answerQuestion);
  }
  return (
    <div className="flex w-full justify-center items-center my-3 overflow-x-auto">
      <label className="shrink-0 mr-1">
        {element.content.minRateDescription}
      </label>
      {element.content.choices.map((choice) => (
        <div className="flex gap-4 mx-1" key={choice.value}>
          <button
            type="button"
            className="border border-themeColor rounded-full md:w-12 md:h-12 w-9 h-9 text-center hover:bg-slate-300"
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
      <label className="shrink-0 ml-1">
        {element.content.maxRateDescription}
      </label>
    </div>
  );
};

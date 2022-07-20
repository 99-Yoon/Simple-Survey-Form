import React, { useState } from "react";
import { RatingType } from "../types";

type Props = {
  element: RatingType;
};

export const ARatingForm = ({ element }: Props) => {
  const [selectedchoice, setSelectedchoice] = useState("");
  function buttonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setSelectedchoice(event.currentTarget.name);
  }
  return (
    <div className="flex w-full justify-center space-x-12 my-3">
      <label className="mt-3">{element.content.minRateDescription}</label>
      {element.content.choices.map((choice) => (
        <div className="flex gap-4">
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

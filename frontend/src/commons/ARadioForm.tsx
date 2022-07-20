import React from "react";
import { RadioType } from "../types";

type Props = {
  element: RadioType;
};

export const ARadioForm = ({ element }: Props) => {
  return (
    <div className="flex w-full gap-2 justify-around my-3">
      {element.content.choices.map((choice) => (
        <div>
          <input className="mr-2 w-4 h-4" type="radio"></input>
          <label className="text-lg">{choice.text}</label>
        </div>
      ))}
    </div>
  );
};

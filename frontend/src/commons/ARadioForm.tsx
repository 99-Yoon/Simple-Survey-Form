import React from "react";
import { RadioType } from "../types";

type Props = {
  element: RadioType;
};

export const ARadioForm = ({ element }: Props) => {
  return (
    <div className="flex w-full gap-4 justify-around my-3">
      {element.content.choices.map((choice) => (
        <div>
          <input className="mr-2" type="radio"></input>
          <label className="text-lg">{choice.value}</label>
        </div>
      ))}
    </div>
  );
};

import React from "react";
import { RatingType } from "../types";

type Props = {
  element: RatingType;
};

export const ARatingForm = ({ element }: Props) => {
  return (
    <div className="flex w-full gap-4 justify-around my-3">
      {element.content.choices.map((choice) => (
        <div>
          <input className="mr-2"></input>
          <label className="text-lg">{choice.text}</label>
        </div>
      ))}
    </div>
  );
};

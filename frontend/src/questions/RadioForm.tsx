import React from "react";
import { RadioType } from "../types";

type Props = {
  element: RadioType;
};

export const RadioForm = ({ element }: Props) => {
  return (
    <div className="flex mt-4">
      {element.content.choices.map((e: any, index: number) => (
        <div>
          <input
            type="radio"
            id={element._id}
            name="choice"
            value={e.text}
            disabled
          />
        </div>
      ))}
    </div>
  );
};

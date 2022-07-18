import React, { useEffect } from "react";
import { CheckboxType } from "../types";

type Props = {
  element: CheckboxType;
};

export const ACheckboxForm = ({ element }: Props) => {
  return (
    <div className="flex w-full gap-4 justify-around my-3">
      {element.content.choices.map((choice) => (
        <div>
          <input className="mr-2" type="checkbox" />
          <label className="text-lg">{choice.text}</label>
        </div>
      ))}
    </div>
  );
};

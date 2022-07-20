import React, { useState } from "react";
import { DropdownType } from "../types";

type Props = {
  element: DropdownType;
};

export const ADropdownForm = ({ element }: Props) => {
  return (
    <div className="flex flex-col container w-4/5 h-auto mb-3 py-3">
      <select className="py-2 w-48 hover:bg-themeColor bg-gray-200 rounded ">
        {element.content.choices.map((choice) => (
          <option>{choice.text}</option>
        ))}
      </select>
    </div>
  );
};

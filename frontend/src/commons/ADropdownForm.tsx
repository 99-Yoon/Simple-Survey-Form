import React, { useState } from "react";
import { DropdownType } from "../types";

type Props = {
  element: DropdownType;
};

export const ADropdownForm = ({ element }: Props) => {
  return (
    <div className="flex flex-col container w-4/5 h-auto items-center m-3 py-3">
      <select className="py-2 hover:bg-themeColor bg-gray-200 rounded ">
        {element.content.choices.map((choice) => (
          <option>{choice.text}</option>
        ))}
      </select>
    </div>
  );
};

import React from "react";
import { FileType } from "../types";

type Props = {
  element: FileType;
};

export const AFileForm = ({ element }: Props) => {
  return (
    <div className="flex w-full gap-4 justify-around my-3">
      {/* {element.content.choices.map((choice) => (
        <div>
          <input className="mr-2"></input>
          <label className="text-lg">{choice.text}</label>
        </div>
      ))} */}
    </div>
  );
};

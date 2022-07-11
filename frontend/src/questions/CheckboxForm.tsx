import React from "react";
import { CheckboxType } from "../types";

type Props = {
  element: CheckboxType;
};

export const QCheckbox = ({ element }: Props) => {
  return (
    <div id="commentarea" className="flex mt-4">
      {element.content.choices.map((e: any) => (
        <div>
          <input type="checkbox" checked={false}></input>
          <input
            type="text"
            className="mx-2 border-b-2"
            placeholder={e.text}
          ></input>
        </div>
      ))}
    </div>
  );
};

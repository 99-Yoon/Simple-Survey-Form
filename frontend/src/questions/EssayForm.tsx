import React from "react";
import { EssayType } from "../types";

type Props = {
  element: EssayType;
  save: boolean;
};

export const EssayForm = ({ element, save }: Props) => {
  return (
    <div id="commentarea" className="flex mt-4 w-full justify-center">
      <input className="border w-11/12 h-16" disabled></input>
    </div>
  );
};

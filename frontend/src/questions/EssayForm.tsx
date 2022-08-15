import React from "react";
import { IEssay } from "../types";

type Props = {
  element: IEssay;
  isEditing: boolean;
};

export const EssayForm = ({ element, isEditing: save }: Props) => {
  return (
    <div id="commentarea" className="flex mt-4 w-full justify-center">
      <input className="border w-11/12 h-16" disabled></input>
    </div>
  );
};

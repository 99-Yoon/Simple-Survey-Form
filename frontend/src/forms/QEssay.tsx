import React from "react";
import { IQuestionFormProps } from "../types";

export const QEssay = ({}: IQuestionFormProps) => {
  return (
    <div id="commentarea" className="flex mt-4 w-full justify-center">
      <input className="border w-11/12 h-16" disabled></input>
    </div>
  );
};

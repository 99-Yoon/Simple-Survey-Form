import React from "react";
import { IQuestionFormProps } from "../types";

export const QFile = ({ element, isEditing }: IQuestionFormProps) => {
  return (
    <div id="content" className="flex mt-4 w-full justify-center">
      <input type="file" className=" w-11/12 h-16" disabled></input>
    </div>
  );
};

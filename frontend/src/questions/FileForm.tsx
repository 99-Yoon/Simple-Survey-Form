import React from "react";
import { IFile } from "../types";

type Props = {
  element: IFile;
  isEditing: boolean;
};

export const FileForm = ({ element, isEditing: save }: Props) => {
  return (
    <div id="content" className="flex mt-4 w-full justify-center">
      <input type="file" className=" w-11/12 h-16" disabled></input>
    </div>
  );
};

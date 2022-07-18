import React from "react";
import { FileType } from "../types";

type Props = {
  element: FileType;
  save: boolean;
};

export const FileForm = ({ element, save }: Props) => {
  return (
    <div id="content" className="flex mt-4 w-full justify-center">
      <input type="file" className=" w-11/12 h-16" disabled></input>
    </div>
  );
};

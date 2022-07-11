import React, { useState } from "react";
import { FileType } from "../types";

type Props = {
  element: FileType;
};

export const QFile = ({ element }: Props) => {
  return (
    <div id="commentarea" className="flex mt-4 w-full justify-center">
      <input type="file" className=" w-11/12 h-16" disabled></input>
    </div>
  );
};

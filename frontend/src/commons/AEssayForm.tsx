import React from "react";
import { EssayType } from "../types";

type Props = {
  element: EssayType;
};

export const AEssayForm = ({ element }: Props) => {
  return (
    <div className="flex mt-4 w-full justify-center">
      <input className="border w-11/12 h-36 my-3"></input>
    </div>
  );
};

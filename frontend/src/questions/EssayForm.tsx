import React, { useState } from "react";
import { EssayType } from "../types";
// import { useQuestion } from "./question.context";
// import { Edit } from "./Edit";
// import { TypeChange } from "./typeDD";

type Props = {
  element: EssayType;
};

export const EssayForm = ({ element }: Props) => {
  // const { questionListChange } = useQuestion();

  return (
    <div id="commentarea" className="flex mt-4 w-full justify-center">
      <input className="border w-11/12 h-16" disabled></input>
    </div>
  );
};

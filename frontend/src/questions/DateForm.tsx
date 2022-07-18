import React from "react";
// import { DateType } from "../types";

type Props = {
  //   element: DateType;
  //   save: boolean;
};

export const DateForm = ({}: Props) => {
  return (
    <div id="content" className="flex mt-4 w-full justify-center">
      <input type="date" className="w-11/12" disabled></input>
    </div>
  );
};

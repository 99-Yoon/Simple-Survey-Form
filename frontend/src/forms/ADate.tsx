import React, { useState } from "react";
import { IAnswerProps } from "../types";

export const ADate = ({ element, answer: content }: IAnswerProps) => {
  const [answer, setAnswer] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    content.content = value;
    setAnswer(value);
    if (content.content) {
      content.requiredCheck = true;
    } else {
      content.requiredCheck = false;
    }
    console.log(content);
  };
  return (
    <div className="justify-start w-11/12 m-3 py-4">
      <input type="date" onChange={handleChange}></input>
    </div>
  );
};

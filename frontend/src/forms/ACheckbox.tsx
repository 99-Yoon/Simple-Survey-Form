import React, { useState } from "react";
import { ICheckbox, IAnswerProps } from "../types";

export const ACheckbox = ({
  element,
  answer: answerQuestion,
}: IAnswerProps) => {
  const [content, setContent] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.currentTarget;
    // console.log("value:", value, "checked:", checked);
    if (checked) {
      content.push(value);
    } else {
      const index = content.indexOf(value);
      if (index !== -1) {
        content.splice(index, 1);
      }
    }
    // if (answerQuestion.content) {
    //   if (answerQuestion.content.find((a: any) => a === value)) {
    //     const newList = answerQuestion.content.filter((a: any) => a !== value);
    //     answerQuestion.content = newList;
    //     if (answerQuestion.content.length) {
    //       answerQuestion.requiredCheck = true;
    //     } else {
    //       answerQuestion.requiredCheck = false;
    //     }
    //   } else {
    //     answerQuestion.content.push(value);
    //     answerQuestion.requiredCheck = true;
    //   }
    // } else {
    //   answerQuestion.content = [];
    //   answerQuestion.content.push(value);
    //   answerQuestion.requiredCheck = true;
    // }
    if (content.length > 0) {
      answerQuestion.requiredCheck = true;
    } else {
      answerQuestion.requiredCheck = false;
    }
    answerQuestion.content = [...content];
    console.log("answer content", answerQuestion);
    setContent([...content]);
  };

  // console.log("content:", content);

  return (
    <div className="flex w-full gap-2 justify-center my-3">
      {element.content.choices.map((choice) => (
        <div key={choice.value} className="mx-2">
          <input
            className="mr-2 w-4 h-4"
            type="checkbox"
            value={choice.text}
            onChange={handleChange}
          />
          <label className="text-lg">{choice.text}</label>
        </div>
      ))}
    </div>
  );
};

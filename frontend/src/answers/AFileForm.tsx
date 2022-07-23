import React, { useState } from "react";
import { FileType, AnswersType, AnswerProps } from "../types";

interface Props extends AnswerProps {
  element: FileType;
  answerQuestion: any | undefined;
  addFiles: (oneFile: { questionId: string; file: File }) => void;
}

export const AFileForm = ({ element, answerQuestion, addFiles }: Props) => {
  const [answer, setAnswer] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const uploadFile = event.currentTarget.files[0];
      addFiles({ questionId: element._id, file: uploadFile });
      answerQuestion.answer = uploadFile.name;
      if (answerQuestion.answer) {
        answerQuestion.requiredCheck = true;
      } else {
        answerQuestion.requiredCheck = false;
      }
      setAnswer(uploadFile.name);
      console.log(answerQuestion);
    }
  };
  return (
    <div id="content" className="flex mt-4 w-full justify-center">
      <input
        type="file"
        name="file"
        className=" w-11/12 h-16"
        onChange={handleChange}
      ></input>
    </div>
  );
};

import React, { useState } from "react";
import { IAnswerProps } from "../types";

interface Props extends IAnswerProps {
  // addFiles: (oneFile: { questionId: string; file: File }) => void;
}

export const AFile = ({ element, answer: answerQuestion }: Props) => {
  const [answer, setAnswer] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const uploadFiles = event.currentTarget.files;
      // const uploadFile = event.currentTarget.files[0];
      // addFiles({ questionId: element._id, file: uploadFile });
      // answerQuestion.content = uploadFile.name;
      answerQuestion.content = uploadFiles;
      if (answerQuestion.content) {
        answerQuestion.requiredCheck = true;
      } else {
        answerQuestion.requiredCheck = false;
      }
      setAnswer(uploadFiles[0].name);
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

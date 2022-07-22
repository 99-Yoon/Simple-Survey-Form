import React, { useState } from "react";
import { FileType, AnswersType } from "../types";

type Props = {
  element: FileType;
  answers: AnswersType | undefined;
  handleAnswer: () => void;
  addFiles: (oneFile: { questionId: string; file: File }) => void;
};

export const AFileForm = ({
  element,
  answers,
  handleAnswer,
  addFiles,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const uploadFile = event.currentTarget.files[0];
      addFiles({ questionId: element._id, file: uploadFile });
      // response.answers.map((a) => {
      //   if (a.questionId === element._id) {
      //     a.answer = uploadFile.name;
      //   }
      // });
      answers && (answers.answer = uploadFile.name);
      handleAnswer();
    }
  };
  return (
    <div id="content" className="flex mt-4 w-full justify-center">
      <input
        type="file"
        name="file"
        className=" w-11/12 h-16"
        onChange={handleChange}
        required={element.isRequired}
      ></input>
    </div>
  );
};

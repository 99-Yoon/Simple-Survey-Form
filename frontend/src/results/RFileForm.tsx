import React from "react";
import { baseImageUrl } from "../apis";

type Props = {
  question: any;
};

export const RFileForm = ({ question }: Props) => {
  return (
    <div className="m-5 flex justify-start items-center">
      {question.answers.map((answer: any) => (
        <>
          <img
            className="h-14"
            key={answer.url}
            alt="file"
            src={`${baseImageUrl}/${answer.url}`}
          />
          <div className="ml-3">{answer.name}</div>
        </>
      ))}
    </div>
  );
};

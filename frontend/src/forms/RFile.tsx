import React, { Fragment } from "react";
import { baseImageUrl } from "../apis";

type Props = {
  question: any;
  answers: any;
};

export const RFile = ({ question, answers }: Props) => {
  console.log("question", question);
  return (
    <div className="m-5 flex justify-start items-center">
      {answers.map((answer: any, index: number) => (
        <Fragment key={index}>
          <img
            className="h-14"
            key={answer[0].url}
            alt="file"
            src={`${baseImageUrl}/${answer[0].url}`}
          />
          <div className="ml-3">{answer[0].name}</div>
        </Fragment>
      ))}
    </div>
  );
};

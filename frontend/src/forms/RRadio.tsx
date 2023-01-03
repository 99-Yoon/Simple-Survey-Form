import React, { useState } from "react";
import { Pie } from "../charts/pies/Pie";
import { IQuestionData } from "../types";

type Props = {
  question: IQuestionData;
};

export const RRadio = ({ question }: Props) => {
  const [dataset, setDataset] = useState([50, 30, 12, 5, 3]);

  const result = question.answers.reduce((acc: any, cur: any) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});
  // console.log(result);

  return (
    <div className="m-5">
      {question.content.choices.map((choice: any, index: number) => (
        <div key={index} className="">
          <span className="font-bold">{choice.text}</span>
          <span className="ml-3">
            - {result[choice.text] ? result[choice.text] : 0}
          </span>
        </div>
      ))}
      <Pie data={dataset} />
    </div>
  );
};

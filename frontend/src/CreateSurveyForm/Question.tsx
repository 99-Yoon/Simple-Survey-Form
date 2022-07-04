import React, { useState } from "react";
import { QAssay } from "./QAssay";
import { QCheckbox } from "./QCheckbox";
import { QRadio } from "./QRadio";

export interface BasicQuestionType {
  type: string;
  name: string;
  title: string;
  isRequired: boolean;
  comment: string;
  content: any;
  [key: string]: string | number | boolean | any;
}
export interface EssayType extends BasicQuestionType {}
export interface RadioType extends BasicQuestionType {
  content: {
    hasOther: boolean;
    choices: any[];
    otherText: string;
  };
}
export interface CheckboxType extends BasicQuestionType {
  content: {
    choices: any[];
    maxCount: number;
  };
}

const EssayQ: EssayType = {
  type: "assay",
  name: "Question1",
  title: "Question1",
  isRequired: false,
  comment: "질문에 대한 설명을 입력해주세요",
  content: null,
};
const RadioQ: RadioType = {
  type: "radio",
  name: "Question2",
  title: "Question2",
  isRequired: false,
  comment: "질문에 대한 설명을 입력해주세요",
  content: {
    hasOther: false,
    otherText: "",
    choices: ["1", "2", "3"],
  },
};
const CheckboxQ: CheckboxType = {
  type: "checkbox",
  name: "Question3",
  title: "Question3",
  isRequired: false,
  comment: "질문에 대한 설명을 입력해주세요",
  content: {
    choices: ["ch1", "ch2", "ch3"],
    maxCount: 2,
  },
};

// const questionList: BasicQuestionType[] = [EssayQ, RadioQ, CheckboxQ];

export const Question = () => {
  const [questionList, setQuestionList] = useState<BasicQuestionType[]>([
    EssayQ,
    RadioQ,
  ]);
  // const [survey, setSurvey] = useState();

  function QuestionListChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const newList: BasicQuestionType[] = [...questionList];
    const targetId: any = e.target.id;
    const obj: any = newList.find((a) => a.name === e.target.name);
    obj[targetId] = e.target.value;
    setQuestionList(newList);
  }

  return (
    <>
      {console.log(questionList)}
      {questionList.map((element) => {
        switch (element.type) {
          case "assay":
            return (
              <QAssay
                element={element}
                QuestionListChange={QuestionListChange}
              />
            );
          case "radio":
            return (
              <QRadio
                element={element}
                QuestionListChange={QuestionListChange}
              />
            );
          case "checkbox":
            return <QCheckbox element={element} />;
          default:
            break;
        }
        // if (element.type === "assay") {
        //   return (
        //     <QAssay element={element} QuestionListChange={QuestionListChange} />
        //   );
        // } else if (element.type === "radio") {
        //   return <QRadio element={element} />;
        // } else if (element.type === "checkbox") {
        //   return <QCheckbox element={element} />;
        // }
      })}
    </>
  );
};

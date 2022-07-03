import React, { useState } from "react";
import { QAssay } from "./QAssay";
import { QCheckbox } from "./QCheckbox";
import { QRadio } from "./QRadio";
import { QDropdown } from "./QDropdown";
import { QFile } from "./QFile";

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
    choices: string[];
    otherText: string;
  };
}
export interface CheckboxType extends BasicQuestionType {
  content: {
    choices: string[];
    maxCount: number;
  };
}
export interface DropdownType extends BasicQuestionType {
  content: {
    choices: string[];
    hasNone: boolean;
  };
}
export interface FileType extends BasicQuestionType {
  content: {
    filename: string;
    value: string;
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
    choices: ["radio1", "radio2", "radio3"],
  },
};
const CheckboxQ: CheckboxType = {
  type: "checkbox",
  name: "Question3",
  title: "Question3",
  isRequired: false,
  comment: "질문에 대한 설명을 입력해주세요",
  content: {
    choices: ["check1", "check2", "check3"],
    maxCount: 2,
  },
};
const DropdownQ: DropdownType = {
  type: "dropdown",
  name: "Question4",
  title: "Question4",
  isRequired: false,
  comment: "질문에 대한 설명을 입력해주세요",
  content: {
    choices: ["drop1", "drop2", "drop3"],
    hasNone: false,
  },
};
const FileQ: FileType = {
  type: "file",
  name: "Question5",
  title: "Question5",
  isRequired: false,
  comment: "질문에 대한 설명을 입력해주세요",
  content: {
    filename: "",
    value: "",
  },
};

// const questionList: BasicQuestionType[] = [EssayQ, RadioQ, CheckboxQ];

export const Question = () => {
  const [questionList, setQuestionList] = useState<BasicQuestionType[]>([
    EssayQ,
    RadioQ,
    CheckboxQ,
    DropdownQ,
    FileQ,
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
            return (
              <QCheckbox
                element={element}
                QuestionListChange={QuestionListChange}
              />
            );
          case "dropdown":
            return (
              <QDropdown
                element={element}
                QuestionListChange={QuestionListChange}
              />
            );
          case "file":
            return (
              <QFile
                element={element}
                QuestionListChange={QuestionListChange}
              />
            );
          default:
            break;
        }
      })}
    </>
  );
};

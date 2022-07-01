import React from "react";
import { Q_Assay } from "./Q_Assay";
import { Q_Checkbox } from "./Q_Checkbox";
import { Q_Radio } from "./Q_Radio";

export interface BasicQuestionType {
  type: string;
  name: string;
  title: string;
  isRequired: boolean;
  content: any;
}

export interface EssayType extends BasicQuestionType {}
let EssayQ: EssayType = {
  type: "assay",
  name: "Question1",
  title: "Question1",
  isRequired: false,
  content: null,
};

export interface RadioType extends BasicQuestionType {
  content: {
    hasOther: boolean;
    choices: any;
    otherText: string;
  };
}
let RadioQ: RadioType = {
  type: "radio",
  name: "Question2",
  title: "Question2",
  isRequired: false,
  content: {
    hasOther: false,
    otherText: "",
    choices: ["1", "2", "3"],
  },
};

export interface CheckboxType extends BasicQuestionType {
  content: {
    choices: any;
    maxCount: number;
  };
}
let CheckboxQ: CheckboxType = {
  type: "checkbox",
  name: "Question3",
  title: "Question3",
  isRequired: false,
  content: {
    choices: ["ch1", "ch2", "ch3"],
    maxCount: 2,
  },
};

let questionList: BasicQuestionType[] = [EssayQ, RadioQ, CheckboxQ];

export const Question = () => (
  <>
    {questionList.map((element) => {
      if (element.type === "assay") {
        return <Q_Assay questionList={questionList} element={element} />;
      } else if (element.type === "radio") {
        return <Q_Radio element={element} />;
      } else if (element.type === "checkbox") {
        return <Q_Checkbox element={element} />;
      }
    })}
  </>
);

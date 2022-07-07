import React, { useState } from "react";
import { Question } from "./Question";
import { QuestionProvider } from "./question.context";

export interface BasicQuestionType {
  type: string;
  _id: string;
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
export interface RatingType extends BasicQuestionType {
  content: {
    rateValues: {
      value: number;
      text: string;
    }[];
    minRateDescription: string;
    maxRateDescription: string;
  };
}

const EssayQ: EssayType = {
  type: "essay",
  _id: "000000000000",
  title: "Question Title",
  isRequired: false,
  comment: "질문에 대한 설명을 입력해주세요",
  content: null,
};
const RadioQ: RadioType = {
  type: "radio",
  _id: "000000000001",
  title: "Question Title",
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
  _id: "000000000002",
  title: "Question Title",
  isRequired: false,
  comment: "질문에 대한 설명을 입력해주세요",
  content: {
    choices: ["check1", "check2", "check3"],
    maxCount: 2,
  },
};
const DropdownQ: DropdownType = {
  type: "dropdown",
  _id: "000000000003",
  title: "Question Title",
  isRequired: false,
  comment: "질문에 대한 설명을 입력해주세요",
  content: {
    choices: ["drop1", "drop2", "drop3"],
    hasNone: false,
  },
};
const FileQ: FileType = {
  type: "file",
  _id: "000000000004",
  title: "Question Title",
  isRequired: false,
  comment: "질문에 대한 설명을 입력해주세요",
  content: {
    filename: "",
    value: "",
  },
};
const RatingQ: RatingType = {
  type: "rating",
  _id: "000000000005",
  title: "Question Title",
  isRequired: false,
  comment: "질문에 대한 설명을 입력해주세요",
  content: {
    rateValues: [
      { value: 1, text: "1" },
      { value: 2, text: "2" },
      { value: 3, text: "3" },
    ],
    minRateDescription: "가장 낮음",
    maxRateDescription: "가장 높음",
  },
};

export const CreateSurveyForm = () => {
  const [survey, setSurvey] = useState();
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <>
      <QuestionProvider>
        <div className="flex flex-col place-items-center">
          <div className="flex flex-col container place-items-center mt-4">
            <input
              type="text"
              className="font-bold text-4xl text-center m-2 border-b-2"
              placeholder="설문지 제목"
            ></input>
            <textarea
              className="font-bold text-1xl text-center m-2 resize-none"
              placeholder="설문조사에 대한 설명을 입력해주세요"
              rows={2}
              cols={60}
            ></textarea>
          </div>
          <Question />
          <div>
            <button className="border bg-themeColor my-5 py-2 px-3 font-bold text-white">
              설문조사 생성
            </button>
          </div>
        </div>
      </QuestionProvider>
    </>
  );
};

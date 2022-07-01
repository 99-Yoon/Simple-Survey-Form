import React from "react";
import { Question } from "./Question";

interface BasicQuestionType {
  type: string;
  name: string;
  title: string;
  isRequired: boolean;
}

interface EssayType extends BasicQuestionType {}
let EssayQ: EssayType = {
  type: "comment",
  name: "Question1",
  title: "제목을 입력하세요",
  isRequired: false,
};

interface MultiChoiceType extends BasicQuestionType {
  hasOther: boolean;
  choices: any;
  otherText: string;
}

export const CreateSurveyForm = () => (
  <div className="flex flex-col place-items-center">
    <div className="flex flex-col container place-items-center">
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

    <div className="flex w-4/5 content-center justify-center border-2 border-black h-8 mt-3">
      질문 추가 +
    </div>
  </div>
);

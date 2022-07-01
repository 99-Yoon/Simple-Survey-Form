import React, { useState } from "react";
import { EssayType, BasicQuestionType } from "./Question";

type Props = {
  element: EssayType;
  questionList: BasicQuestionType[];
};

export const Q_Assay = ({ element, questionList }: Props) => {
  console.log(questionList);
  return (
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-2">
      <div className="flex flexgi-row h-16 w-full place-content-between items-center">
        <p className="text-xl font-bold w-1/2 ml-6">
          <input type="text" placeholder={element.title}></input>
        </p>
        <select
          id="Questions"
          className="w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor focus:themeColor block w-full mr-3 p-2.5"
        >
          <option>질문종류</option>
          <option value="Essay" selected>
            주관식
          </option>
          <option value="MultipleChoice">객관식</option>
          <option value="Dropdown">드롭다운(객관식)</option>
          <option value="CheckBox">체크박스(객관식)</option>
          <option value="Rating">선형</option>
          <option value="Grid">그리드</option>
          <option value="Date">날짜</option>
        </select>
      </div>
      <div className="flex ">
        <textarea
          className="border"
          rows={1}
          cols={80}
          placeholder="질문에 대한 설명을 입력해주세요"
        ></textarea>
      </div>
      <div id="commentarea" className="flex border mt-4">
        <textarea className="resize-none" cols={80} readOnly></textarea>
      </div>
      <div className="flex w-full flex-row justify-end py-2">
        <button className="w-1/12">필수</button>
        <button className="w-1/12">삭제</button>
      </div>
    </div>
  );
};

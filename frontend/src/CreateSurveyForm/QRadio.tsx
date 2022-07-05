import React from "react";
import { RadioType } from "./CreateSurveyFormPage";

type Props = {
  element: RadioType;
  QuestionListChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const QRadio = ({ element, QuestionListChange }: Props) => (
  <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-2">
    <div className="flex h-16 w-full place-content-between items-center">
      <input
        type="text"
        id={element.id}
        name="title"
        className="text-xl font-bold ml-6 border-b-2 w-1/2"
        placeholder={element.title}
        onChange={QuestionListChange}
      ></input>
      <select
        id="Questions"
        className="w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor focus:themeColor block w-full mr-3 p-2.5"
      >
        <option>질문종류</option>
        <option value="Essay">주관식</option>
        <option value="MultipleChoice" selected>
          객관식
        </option>
        <option value="Dropdown">드롭다운(객관식)</option>
        <option value="CheckBox">체크박스(객관식)</option>
        <option value="Rating">선형</option>
        <option value="Grid">그리드</option>
        <option value="Date">날짜</option>
      </select>
    </div>
    <div className="flex w-full justify-center">
      <input
        type="text"
        id={element.id}
        name="comment"
        className="border w-11/12"
        placeholder="질문에 대한 설명을 입력해주세요"
        onChange={QuestionListChange}
      ></input>
    </div>
    <div className="flex mt-4">
      {element.content.choices.map((e: string, index: number) => (
        <div>
          <input
            type="radio"
            id={element.id}
            name="choice"
            value={e}
            disabled
          />
          <input
            type="text"
            name={"choice" + `${index}`}
            // key={`${index}`}
            className="mx-2 border-b-2"
            placeholder={e}
            onChange={QuestionListChange}
          ></input>
          <button></button>
        </div>
      ))}
      {/* <button className="border rounded-full border-green-500 border-4 text-green-500 font-bold px-2">
        +
      </button> */}
    </div>
    <div className="flex w-full flex-row justify-end py-2">
      <button className="w-1/12">필수</button>
      <button className="w-1/12">옵션</button>
      <button className="w-1/12">삭제</button>
    </div>
  </div>
);

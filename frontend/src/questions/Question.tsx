import React, { useState } from "react";
import { BasicQuestionType, EssayType } from "../types";
import { EssayForm } from "./EssayForm";
import { RadioForm } from "./RadioForm";

type Props = {
  element: BasicQuestionType;
};

export const Question = ({ element }: Props) => {
  const handleClick = () => {};

  const typeDD = new Map([
    ["essay", "주관식"],
    ["radio", "객관식"],
    ["dropdown", "드롭다운(객관식)"],
    ["checkbox", "체크박스"],
    ["file", "파일"],
    ["rating", "선형"],
    ["grid", "그리드"],
    ["date", "날짜"],
  ]);

  function changeDD(e: React.ChangeEvent<HTMLSelectElement>) {
    const tt = e.target.value;
    // questionTypeChange(e);
    console.log(tt);
    //if문으로 type별로 content 바뀌게 해보기
  }

  function getContent(element: BasicQuestionType) {
    switch (element.type) {
      case "essay":
        return <EssayForm element={element} />;
      case "radio":
        return <RadioForm element={element} />;
      case "checkbox":
      // return <CheckboxForm element={element} />;
      case "dropdown":
      // return <DropdownForm element={element} />;
      case "file":
      //  return <FileForm element={element} />;
      case "rating":
      //  return <RatingForm element={element} />;
      default:
        return <></>;
    }
  }

  return (
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-2">
      <div className="flex h-16 w-full place-content-between items-center">
        <input
          type="text"
          name="title"
          id={element._id}
          className="text-xl font-bold ml-6 border-b-2 w-1/2"
          placeholder={element.title}
          // onChange={questionListChange}
        ></input>
        <select
          id="Questions"
          name="type"
          className="w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full mr-3 p-2.5"
          defaultValue={element.type}
          onChange={changeDD}
        >
          {Array.from(typeDD.entries()).map(([key, value]) => (
            <option value={key}>{value}</option>
          ))}
        </select>
      </div>
      <div className="flex w-full justify-center">
        <input
          type="text"
          name="comment"
          id={element._id}
          className="border w-11/12"
          placeholder="질문에 대한 설명을 입력해주세요"
          // onChange={questionListChange}
        ></input>
      </div>
      {getContent(element)}

      <div className="place-self-end py-2">
        <button className="px-0.5">필수</button>
        <button className="px-0.5">옵션</button>
        <button className="px-0.5">삭제</button>
        <button id={element.id} className="px-0.5" onClick={handleClick}>
          수정
        </button>
      </div>
    </div>
  );
};

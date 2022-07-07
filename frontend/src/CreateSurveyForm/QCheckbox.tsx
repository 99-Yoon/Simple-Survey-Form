import React from "react";
import { CheckboxType } from "./CreateSurveyFormPage";
import { useQuestion } from "./question.context";
import { Edit } from "./Edit";

type Props = {
  element: CheckboxType;
};

export const QCheckbox = ({ element }: Props) => {
  const { questionListChange } = useQuestion();

  return (
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-2">
      <div className="flex flexgi-row h-16 w-full place-content-between items-center">
        <input
          type="text"
          name="title"
          id={element._id}
          className="text-xl font-bold ml-6 border-b-2 w-1/2"
          placeholder={element.title}
          onChange={questionListChange}
        ></input>
        <select
          id="Questions"
          className="w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor w-full mr-3 p-2.5"
        >
          <option>질문종류</option>
          <option value="essay">주관식</option>
          <option value="radio">객관식</option>
          <option value="dropdown">드롭다운(객관식)</option>
          <option value="checkbox" selected>
            체크박스(객관식)
          </option>
          <option value="file">파일업로드</option>
          <option value="rating">선형</option>
          <option value="grid">그리드</option>
          <option value="date">날짜</option>
        </select>
      </div>
      <div className="flex w-full justify-center">
        <input
          type="text"
          name="comment"
          id={element._id}
          className="border w-11/12"
          placeholder="질문에 대한 설명을 입력해주세요"
          onChange={questionListChange}
        ></input>
      </div>
      <div id="commentarea" className="flex mt-4">
        {element.content.choices.map((e: string) => (
          <div>
            <input type="checkbox" checked={false}></input>
            <input
              type="text"
              className="mx-2 border-b-2"
              placeholder={e}
            ></input>
          </div>
        ))}
      </div>
      <div className="flex w-full flex-row justify-end py-2">
        <button className="w-1/12">필수</button>
        <button className="w-1/12">옵션</button>
        <button className="w-1/12">삭제</button>
        <Edit id={element._id} />
      </div>
    </div>
  );
};

import React from "react";
import { BasicQuestionType, SurveyType } from "../types";

type Props = {
  data: SurveyType;
};
export const MySurveyCard = ({ data }: Props) => {
  return (
    <div className="w-48 h-60 rounded overflow-hidden border-2">
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">{data.comment}</p>
      </div>
      <div className="flex flex-col py-6">
        <div className="px-2 py-2">
          <label>{data.title}</label>
        </div>
        <div className="flex justify-end">
          <select
            className="py-2 w-14 bg-themeColor rounded text-white"
            //value={}
            //onChange={}
          >
            <option value="option">옵션</option>
            <option value="option">삭제</option>
            <option value="option">이름 바꾸기</option>
          </select>
        </div>
      </div>
    </div>
  );
};

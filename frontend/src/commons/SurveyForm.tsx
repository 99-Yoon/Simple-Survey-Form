import React, { InputHTMLAttributes } from "react";
import { ACheckboxForm } from "./ACheckbox";
import { ADropdownForm } from "./ADropdown";
import { AEssayForm } from "./AEssayForm";
import { ARadioForm } from "./ARadioForm";

export const SurveyForm = () => {
  return (
    <div className="flex flex-col place-items-center">
      <div className="flex flex-col container place-items-center mt-4">
        <form className="font-bold text-4xl text-center m-2">설문지 제목</form>
        <textarea
          className="font-bold text-1xl text-center m-2 resize-none"
          placeholder="설문조사에 대한 설명을 입력해주세요"
          rows={2}
          cols={60}
        ></textarea>
        <ACheckboxForm></ACheckboxForm>
        <ADropdownForm></ADropdownForm>
        <AEssayForm></AEssayForm>
        <ARadioForm></ARadioForm>
        <div>
          <button className="rounded bg-themeColor my-5 py-2 px-5 font-bold text-white">
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasicQuestionType, SurveyType } from "../types";
import { ACheckboxForm } from "./ACheckbox";
import { ADropdownForm } from "./ADropdown";
import { AEssayForm } from "./AEssayForm";
import { ARadioForm } from "./ARadioForm";

type PropsType = {
  question: BasicQuestionType;
};
export const AQuestion = ({ question }: PropsType) => {
  function getContent(question: BasicQuestionType) {
    switch (question.type) {
      case "essay":
        return <AEssayForm element={question} />;
      case "radio":
        return <ARadioForm element={question} />;
      case "checkbox":
        return <ACheckboxForm element={question} />;
      case "dropdown":
        return <ADropdownForm element={question} />;
      // case "file":
      //   return <AFileForm element={element} currentId={currentId} />;
      // case "rating":
      //   return (
      //     <ARatingForm
      //       handleQuestion={handleQuestion}
      //       element={element}
      //       currentId={currentId}
      //     />
      //   );
      default:
        return <></>;
    }
  }

  return (
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-3">
      <div className="flex flexgi-row h-16 w-full place-content-between items-center">
        <div className="text-xl font-bold ml-6 w-1/2">질문</div>
      </div>
      <div className="border w-11/12 my-3">내용</div>
      {getContent(question)}
    </div>
  );
};

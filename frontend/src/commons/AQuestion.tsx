import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasicQuestionType, SurveyType } from "../types";
import { ACheckboxForm } from "./ACheckboxForm";
import { ADateForm } from "./ADateForm";
import { ADropdownForm } from "./ADropdownForm";
import { AEssayForm } from "./AEssayForm";
import { AFileForm } from "./AFileForm";
// import { AMatrixForm } from "./AMatrixForm";
import { ARadioForm } from "./ARadioForm";
import { ARatingForm } from "./ARatingForm";

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
      case "file":
        return <AFileForm element={question} />;
      case "rating":
        return <ARatingForm element={question} />;
      case "date":
        return <ADateForm />;
      // case "matrix":
      //   return <AMatrixForm />;
      default:
        return <></>;
    }
  }

  return (
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-3">
      <div className="flex flexgi-row h-16 w-full place-content-between items-center">
        <div className="text-xl font-bold ml-6 w-1/2">{question.title}</div>
      </div>
      <div className="w-11/12 my-3">{question.comment}</div>
      {getContent(question)}
    </div>
  );
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasicQuestionType, AnswerType, SurveyType } from "../types";
import { ACheckboxForm } from "./ACheckboxForm";
import { ADateForm } from "./ADateForm";
import { ADropdownForm } from "./ADropdownForm";
import { AEssayForm } from "./AEssayForm";
import { AFileForm } from "./AFileForm";
import { ARadioForm } from "./ARadioForm";
import { ARatingForm } from "./ARatingForm";

type Props = {
  question: BasicQuestionType;
  response: AnswerType;
  handleAnswer: () => void;
  addFiles: (oneFile: { questionId: string; file: File }) => void;
};
export const AQuestion = ({
  question,
  handleAnswer,
  response,
  addFiles,
}: Props) => {
  function getContent(question: BasicQuestionType) {
    switch (question.type) {
      case "essay":
        return (
          <AEssayForm
            element={question}
            response={response}
            handleAnswer={handleAnswer}
          />
        );
      case "radio":
        return (
          <ARadioForm
            element={question}
            response={response}
            handleAnswer={handleAnswer}
          />
        );
      case "checkbox":
        return (
          <ACheckboxForm
            element={question}
            response={response}
            handleAnswer={handleAnswer}
          />
        );
      case "dropdown":
        return (
          <ADropdownForm
            element={question}
            response={response}
            handleAnswer={handleAnswer}
          />
        );
      case "file":
        return (
          <AFileForm
            element={question}
            response={response}
            handleAnswer={handleAnswer}
            addFiles={addFiles}
          />
        );
      case "rating":
        return (
          <ARatingForm
            element={question}
            response={response}
            handleAnswer={handleAnswer}
          />
        );
      case "date":
        return (
          <ADateForm
            element={question}
            response={response}
            handleAnswer={handleAnswer}
          />
        );
      default:
        return <></>;
    }
  }

  return (
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-4">
      <div className="flex flexgi-row my-1 w-11/12 place-content-between items-center">
        <div className="text-xl font-bold">{question.title}</div>
      </div>
      <div className="w-11/12 text-slate-500">{question.comment}</div>
      {getContent(question)}
    </div>
  );
};

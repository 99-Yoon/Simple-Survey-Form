import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasicQuestionType, AnswerType, SurveyType } from "../types";
import { ACheckboxForm } from "./ACheckbox";
import { ADropdownForm } from "./ADropdown";
import { AEssayForm } from "./AEssayForm";
import { ARadioForm } from "./ARadioForm";

type Props = {
  question: BasicQuestionType;
  response: AnswerType;
  handleAnswer: () => void;
};
export const AQuestion = ({ question, handleAnswer, response }: Props) => {
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
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-4">
      <div className="flex flexgi-row my-1 w-11/12 place-content-between items-center">
        <div className="text-xl font-bold">{question.title}</div>
      </div>
      <div className="w-11/12 text-slate-500">{question.comment}</div>
      {getContent(question)}
    </div>
  );
};

import React from "react";
import { BasicQuestionType, AnswerQuestionType } from "../types";
import { ACheckboxForm } from "./ACheckboxForm";
import { ADateForm } from "./ADateForm";
import { ADropdownForm } from "./ADropdownForm";
import { AEssayForm } from "./AEssayForm";
import { AFileForm } from "./AFileForm";
import { ARadioForm } from "./ARadioForm";
import { ARatingForm } from "./ARatingForm";

type Props = {
  question: BasicQuestionType;
  answerQuestion: AnswerQuestionType;
  addFiles: (oneFile: { questionId: string; file: File }) => void;
};
export const AQuestion = ({ question, answerQuestion, addFiles }: Props) => {
  function getContent(question: BasicQuestionType) {
    switch (question.type) {
      case "essay":
        return (
          <AEssayForm element={question} answerQuestion={answerQuestion} />
        );
      case "radio":
        return (
          <ARadioForm element={question} answerQuestion={answerQuestion} />
        );
      case "checkbox":
        return (
          <ACheckboxForm element={question} answerQuestion={answerQuestion} />
        );
      case "dropdown":
        return (
          <ADropdownForm element={question} answerQuestion={answerQuestion} />
        );
      case "file":
        return (
          <AFileForm
            element={question}
            answerQuestion={answerQuestion}
            addFiles={addFiles}
          />
        );
      case "rating":
        return (
          <ARatingForm element={question} answerQuestion={answerQuestion} />
        );
      case "date":
        return <ADateForm element={question} answerQuestion={answerQuestion} />;
      default:
        return <></>;
    }
  }

  return (
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-4">
      <div className="flex flexgi-row my-1 w-11/12 place-content-between items-center">
        <div className="text-xl font-bold">{question.title}</div>
        {question.isRequired ? (
          <div className="text-xs text-red-600">* 필수질문</div>
        ) : (
          <></>
        )}
      </div>
      <div className="w-11/12 text-slate-500">{question.comment}</div>
      {getContent(question)}
    </div>
  );
};

import React from "react";
import { BasicQuestionType, AnswersType } from "../types";
import { ACheckboxForm } from "./ACheckboxForm";
import { ADateForm } from "./ADateForm";
import { ADropdownForm } from "./ADropdownForm";
import { AEssayForm } from "./AEssayForm";
import { AFileForm } from "./AFileForm";
import { ARadioForm } from "./ARadioForm";
import { ARatingForm } from "./ARatingForm";

type Props = {
  question: BasicQuestionType;
  answers: AnswersType;
  handleAnswer: () => void;
  addFiles: (oneFile: { questionId: string; file: File }) => void;
};
export const AQuestion = ({
  question,
  handleAnswer,
  answers: answers,
  addFiles,
}: Props) => {
  function getContent(question: BasicQuestionType) {
    switch (question.type) {
      case "essay":
        return (
          <AEssayForm
            element={question}
            answers={answers}
            handleAnswer={handleAnswer}
          />
        );
      case "radio":
        return (
          <ARadioForm
            element={question}
            answers={answers}
            handleAnswer={handleAnswer}
          />
        );
      case "checkbox":
        return (
          <ACheckboxForm
            element={question}
            answers={answers}
            handleAnswer={handleAnswer}
          />
        );
      case "dropdown":
        return (
          <ADropdownForm
            element={question}
            answers={answers}
            handleAnswer={handleAnswer}
          />
        );
      case "file":
        return (
          <AFileForm
            element={question}
            answers={answers}
            handleAnswer={handleAnswer}
            addFiles={addFiles}
          />
        );
      case "rating":
        return (
          <ARatingForm
            element={question}
            answers={answers}
            handleAnswer={handleAnswer}
          />
        );
      case "date":
        return (
          <ADateForm
            element={question}
            answers={answers}
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

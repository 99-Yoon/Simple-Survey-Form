import React, { useState } from "react";
import { BasicQuestionType } from "./CreateSurveyFormPage";
import { QEssay } from "./QEssay";
import { QCheckbox } from "./QCheckbox";
import { QRadio } from "./QRadio";
import { QDropdown } from "./QDropdown";
import { QFile } from "./QFile";

type Props = {
  questionList: BasicQuestionType[];
  QuestionListChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addQuestion: () => void;
};

export const Question = ({
  questionList,
  QuestionListChange,
  addQuestion,
}: Props) => {
  return (
    <>
      {console.log(questionList)}
      {questionList.map((element) => {
        switch (element.type) {
          case "essay":
            return (
              <QEssay
                element={element}
                QuestionListChange={QuestionListChange}
              />
            );
          case "radio":
            return (
              <QRadio
                element={element}
                QuestionListChange={QuestionListChange}
              />
            );
          case "checkbox":
            return (
              <QCheckbox
                element={element}
                QuestionListChange={QuestionListChange}
              />
            );
          case "dropdown":
            return (
              <QDropdown
                element={element}
                QuestionListChange={QuestionListChange}
              />
            );
          case "file":
            return (
              <QFile
                element={element}
                QuestionListChange={QuestionListChange}
              />
            );

          default:
            break;
        }
      })}
      <div className="flex w-4/5 content-center justify-center border-2 border-black h-8 mt-3">
        <button onClick={addQuestion}>질문 추가</button>
      </div>
    </>
  );
};

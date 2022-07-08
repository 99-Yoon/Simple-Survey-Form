import React, { useState } from "react";
import { QEssay } from "./QEssay";
import { QCheckbox } from "./QCheckbox";
import { QRadio } from "./QRadio";
import { QDropdown } from "./QDropdown";
import { QFile } from "./QFile";
import { QRating } from "./QRating";
import { useQuestion } from "./question.context";

type Props = {};

export const Questions = ({}: Props) => {
  const { addQuestion, questionList, currentId } = useQuestion();

  return (
    <>
      {console.log(questionList, currentId)}
      {questionList.map((element) => {
        switch (element.type) {
          case "essay":
            return <QEssay element={element} />;
          case "radio":
            return <QRadio element={element} />;
          case "checkbox":
            return <QCheckbox element={element} />;
          case "dropdown":
            return <QDropdown element={element} />;
          case "file":
            return <QFile element={element} />;
          case "rating":
            return <QRating element={element} />;
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

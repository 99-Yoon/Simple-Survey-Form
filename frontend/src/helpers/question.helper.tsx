import React from "react";
import {
  QCheckbox,
  QDate,
  QDropdown,
  QEssay,
  QFile,
  QRadio,
  QRating,
  ACheckbox,
  ADate,
  ADropdown,
  AEssay,
  AFile,
  ARadio,
  ARating,
  REssay,
  RCheckbox,
  RRadio,
  RDropdown,
  RFile,
  RRating,
  RDate,
} from "../forms";
import { CreateQuestionData, IAnswer, IQuestionData } from "../types";

export const getElementByQuestionType = (
  element: CreateQuestionData,
  handleQuestion: Function,
  isEditing: boolean
) => {
  switch (element.type) {
    case "singletext":
      return (
        <QEssay
          element={element}
          isEditing={isEditing}
          handleQuestion={handleQuestion}
        />
      );
    case "radio":
      return (
        <QRadio
          handleQuestion={handleQuestion}
          element={element}
          isEditing={isEditing}
        />
      );
    case "checkbox":
      return (
        <QCheckbox
          handleQuestion={handleQuestion}
          element={element}
          isEditing={isEditing}
        />
      );
    case "dropdown":
      return (
        <QDropdown
          handleQuestion={handleQuestion}
          element={element}
          isEditing={isEditing}
        />
      );
    case "file":
      return (
        <QFile
          element={element}
          isEditing={isEditing}
          handleQuestion={handleQuestion}
        />
      );
    case "rating":
      return (
        <QRating
          handleQuestion={handleQuestion}
          element={element}
          isEditing={isEditing}
        />
      );
    case "date":
      return <QDate />;
    default:
      return <></>;
  }
};

export const getAnswerElementByType = (
  element: IQuestionData,
  answer: IAnswer
) => {
  switch (element.type) {
    case "singletext":
      return <AEssay element={element} answer={answer} />;
    case "radio":
      return <ARadio answer={answer} element={element} />;
    case "checkbox":
      return <ACheckbox answer={answer} element={element} />;
    case "dropdown":
      return <ADropdown answer={answer} element={element} />;
    case "file":
      return <AFile element={element} answer={answer} />;
    case "rating":
      return <ARating answer={answer} element={element} />;
    case "date":
      return <ADate element={element} answer={answer} />;
    default:
      return <></>;
  }
};

export const getResultElementByType = (
  question: IQuestionData,
  answers: any
) => {
  switch (question.type) {
    case "singletext":
      return <REssay question={question} answers={answers} />;
    case "radio":
      return <RRadio question={question} answers={answers} />;
    case "checkbox":
      return <RCheckbox question={question} answers={answers} />;
    case "dropdown":
      return <RDropdown question={question} answers={answers} />;
    case "file":
      return <RFile question={question} answers={answers} />;
    case "rating":
      return <RRating question={question} answers={answers} />;
    case "date":
      return <RDate question={question} answers={answers} />;
    default:
      return <></>;
  }
};

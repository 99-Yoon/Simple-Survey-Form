import React from "react";
import { Page } from "./Page";
import { QuestionProvider } from "./question.context";

export const CreateSurveyForm = () => {
  return (
    <>
      <QuestionProvider>
        <Page />
      </QuestionProvider>
    </>
  );
};

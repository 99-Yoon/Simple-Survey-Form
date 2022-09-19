import React, { ChangeEvent, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { surveyApi } from "../apis";
import type { CreateQuestionData, IQuestionData, ISurvey } from "../types";
import { ModifySurvey } from "./ModifySurvey";
import { useSurvey } from "../layouts/SurveyLayout";
import { SpinnerIcon } from "../icons";
import { ModifySurveyView } from "./ModifySurveyView";

export const EditSurvey = () => {
  const {
    survey,
    createQuestion,
    removeQuestion,
    updateQuestion,
    updateTitleComment,
  } = useSurvey();

  const questions = survey.questions;

  console.log("survey", survey);
  console.log("questions", questions);

  const handleTitleComment = (state: { title: string; comment: string }) => {
    console.log("title in handle title and comment:", state);
    updateTitleComment(state);
  };

  const addQuestion = async () => {
    const question: IQuestionData = {
      order: questions.length,
      type: "singletext",
      title: "",
      comment: "",
      isRequired: false,
      content: { choices: [] },
    };
    await createQuestion(question);
  };

  async function deleteQuestion(id: string) {
    await removeQuestion(id);
  }

  if (!survey) {
    return (
      <div className="flex justify-center mt-5">
        <SpinnerIcon className="animate-spin h-10 w-10 mr-1 bg-white text-slate-500" />
      </div>
    );
  }

  return (
    <ModifySurveyView
      questions={questions}
      survey={survey}
      addQuestion={addQuestion}
      deleteQuestion={deleteQuestion}
      handleQuestion={updateQuestion}
      handleTitleComment={handleTitleComment}
    />
  );
};

import React, { ChangeEvent, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { surveyApi } from "../apis";
import type { CreateQuestionData, IQuestionData, ISurvey } from "../types";
import { ModifySurvey } from "./ModifySurvey";
import { useSurvey } from "../layouts/SurveyLayout";
import { SpinnerIcon } from "../icons";
import { ModifySurveyView } from "./ModifySurveyView";

export const EditSurvey = () => {
  const { survey, createQuestion, removeQuestion, update, updateQuestion } =
    useSurvey();
  // const [survey, setSurvey] = useState<ISurvey>(surveyData);
  // const [questions, setQuestions] = useState<CreateQuestionData[]>(() => {
  //   const questions = survey.questions;
  //   return questions.map((question) => ({ ...question, isEditing: false }));
  // });

  const questions = survey.questions;

  console.log("survey", survey);
  console.log("questions", questions);

  // const update = async (surveyData: ISurvey) => {
  //   const result = await surveyApi.updateSurvey(surveyData);
  //   return result;
  // };

  const handleTitleComment = (state: { title: string; comment: string }) => {
    console.log("title in handle title and comment:", state);
    // survey.title = title
    update({ ...survey, title: state.title, comment: state.comment });
  };

  /**
   * 수정된 질문을 입력받아 기존 질문을 대체합니다.
   * @param question 수정할 질문
   * @returns 없음
   */
  // const updateQuestion = (question: CreateQuestionData) => {
  //   const index = questions.findIndex((q) => q._id === question._id);
  //   if (index < 0) {
  //     return;
  //   }
  //   questions[index] = question;
  //   console.log("questions in update question:", questions);
  //   // setQuestions([...questions]);
  //   survey.questions = questions;
  //   update(survey);
  // };

  const addQuestion = async () => {
    const question: CreateQuestionData = {
      order: questions.length,
      type: "singletext",
      title: "",
      comment: "",
      isRequired: false,
      content: { choices: [] },
      isEditing: true,
    };
    // const updatedSurvey = await surveyApi.addQuestion(survey._id!, question);
    await createQuestion(question);
    // console.log("new question:", updatedSurvey);
    // await update(updatedSurvey);
    // setQuestions([...questions, question]);
  };

  async function deleteQuestion(id: string) {
    await removeQuestion(id);
    // const delQuestions = questions.filter((question) => question._id !== id);
    // setQuestions(delQuestions);
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
      // callApi={update}
    />
  );
};

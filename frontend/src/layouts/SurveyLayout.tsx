import React from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSurveys } from "./SurveysLayout";
import type {
  CreateQuestionData,
  ICreateSurvey,
  IQuestionData,
  ISurvey,
} from "../types";
import { SpinnerIcon } from "../icons";
import { surveyApi } from "../apis";

type SurveyContextType = {
  survey: ICreateSurvey;
  update: (survey: ISurvey) => Promise<any>;
  createQuestion: (question: IQuestionData) => Promise<any>;
  removeQuestion: (questionId: string) => Promise<any>;
  updateQuestion: (question: CreateQuestionData) => Promise<any>;
};

const activeStyle =
  "w-36 h-12 flex justify-center items-center bg-themeColor p-1 text-white text-center font-bold text-xl";
const inActiveStyle =
  "w-36 h-12 flex justify-center items-center bg-white border border-themeColor first:border-r-0 last:border-l-0 p-1 text-center font-bold text-xl";

export const SurveyLayout = () => {
  const { surveys, update, updateLocalSurveysList } = useSurveys();
  let { surveyId } = useParams<{ surveyId: string }>();
  const survey = surveys.find((survey) => survey._id === surveyId);

  // console.log("surveys in survey layout", surveys);

  if (!survey) {
    return (
      <div className="flex justify-center mt-5">
        <SpinnerIcon className="animate-spin h-10 w-10 mr-1 bg-white text-slate-500" />
      </div>
    );
  }

  const createQuestion = async (question: IQuestionData) => {
    const newQuestion = await surveyApi.addQuestion(survey._id!, question);
    console.log("new question:", newQuestion);
    newQuestion.isEditing = true;
    survey.questions.push(newQuestion);
    updateLocalSurveysList(survey);
  };

  const removeQuestion = async (questionId: string) => {
    await surveyApi.deleteQuestion(survey._id!, questionId);

    const questions = survey.questions;
    const updatedQuestions = questions.filter((q) => q._id !== questionId);

    console.log("questions after deleted question:", updatedQuestions);
    survey.questions = updatedQuestions;
    updateLocalSurveysList(survey);
  };

  const updateQuestion = async (question: CreateQuestionData) => {
    await surveyApi.updateQuestion(survey._id!, question);

    const questions = survey.questions;
    const index = questions.findIndex((q) => q._id === question._id);
    if (index < 0) {
      return;
    }
    questions[index] = question;
    console.log("questions in update question:", questions);
    // setQuestions([...questions]);
    survey.questions = questions;
    updateLocalSurveysList(survey);
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-6">
        <NavLink
          to={`/surveys/${surveyId}/edit`}
          className={({ isActive }) =>
            isActive
              ? activeStyle + " rounded-l-3xl"
              : inActiveStyle + " rounded-l-3xl"
          }
        >
          설문지 수정
        </NavLink>
        <NavLink
          to={`/surveys/${surveyId}`}
          end={true}
          className={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
        >
          설문 미리보기
        </NavLink>
        <NavLink
          to={`/surveys/${surveyId}/result`}
          className={({ isActive }) =>
            isActive
              ? activeStyle + " rounded-r-3xl"
              : inActiveStyle + " rounded-r-3xl"
          }
        >
          응답결과
        </NavLink>
      </div>
      <Outlet
        context={{
          survey,
          createQuestion,
          removeQuestion,
          update,
          updateQuestion,
        }}
      />
    </div>
  );
};

export const useSurvey = () => {
  return useOutletContext<SurveyContextType>();
};

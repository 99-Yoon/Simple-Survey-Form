import axios from "axios";
import { CreateQuestionData, IQuestionData, ISurvey } from "../types";
import baseUrl from "./baseUrl";

export const addQuestion = async (
  surveyId: string,
  question: IQuestionData
) => {
  const { data } = await axios.post(
    `${baseUrl}/surveys/${surveyId}/questions`,
    question
  );
  return data;
};

export const createSurvey = async (survey: ISurvey) => {
  const { data } = await axios.post(`${baseUrl}/surveys`, survey);
  return data;
};

export const deleteQuestion = async (surveyId: string, questionId: string) => {
  const { data } = await axios.delete(
    `${baseUrl}/surveys/${surveyId}/questions/${questionId}`
  );
  return data;
};

export const deleteSurvey = async (surveyId: string) => {
  const { data } = await axios.delete(`${baseUrl}/surveys/${surveyId}`);
  return data;
};

export const getSurvey = async (surveyId: string) => {
  const { data } = await axios.get(`${baseUrl}/surveys/${surveyId}/edit`);
  return data;
};

export const getSurveyById = async (surveyId: string) => {
  const { data } = await axios.get(`${baseUrl}/surveys/${surveyId}`);
  return data;
};

export const getSurveys = async () => {
  const { data } = await axios.get(`${baseUrl}/surveys/`);
  return data;
};

export const resultSurvey = async (survey: ISurvey) => {
  const { data } = await axios.put(
    `${baseUrl}/surveys/${survey._id}/result`,
    survey
  );
  return data;
};

export const updateQuestion = async (
  surveyId: string,
  question: CreateQuestionData
) => {
  const { data } = await axios.put(
    `${baseUrl}/surveys/${surveyId}/questions/${question._id}`,
    question
  );
  return data;
};

export const updateSurvey = async (survey: ISurvey) => {
  const { data } = await axios.put(`${baseUrl}/surveys/${survey._id}`, survey);
  return data;
};

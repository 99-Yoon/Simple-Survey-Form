import axios from "axios";
import { ISurvey } from "../types";
import baseUrl from "./baseUrl";

export const createSurvey = async (survey: ISurvey) => {
  const { data } = await axios.post(`${baseUrl}/surveys`, survey);
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

export const updateSurvey = async (survey: ISurvey) => {
  const { data } = await axios.put(`${baseUrl}/surveys/${survey._id}`, survey);
  return data;
};

export const resultSurvey = async (survey: ISurvey) => {
  const { data } = await axios.put(
    `${baseUrl}/surveys/${survey._id}/result`,
    survey
  );
  return data;
};

export const deleteSurvey = async (surveyId: string) => {
  const { data } = await axios.delete(`${baseUrl}/surveys/${surveyId}`);
  return data;
};

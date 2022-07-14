import axios from "axios";
import { SurveyType } from "../types";
import baseUrl from "./baseUrl";

export const createSurvey = async (survey: SurveyType) => {
  const { data } = await axios.post(`${baseUrl}/surveys/create`, survey);
  return data;
};

export const getSurvey = async (surveyId: string) => {
  const { data } = await axios.get(`${baseUrl}/surveys/edit/${surveyId}`);
  return data;
};
//동혁
export const getSurveys = async () => {
  const { data } = await axios.get(`${baseUrl}/surveys/`);
  return data;
};

export const editSurvey = async (survey: SurveyType) => {
  const { data } = await axios.put(
    `${baseUrl}/surveys/edit/${survey._id}`,
    survey
  );
  return data;
};

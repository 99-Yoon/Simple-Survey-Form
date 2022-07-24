import axios from "axios";
import { AnswerType } from "../types";
import baseUrl from "./baseUrl";

export const saveAnswers = async (answer: FormData) => {
  const { data } = await axios.post(`${baseUrl}/answers`, answer);
  return data;
};

export const getAnswers = async (surveyId: string) => {
  const { data } = await axios.get(`${baseUrl}/answers/${surveyId}`);
  return data;
};

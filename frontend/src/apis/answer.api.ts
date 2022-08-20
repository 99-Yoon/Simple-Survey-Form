import axios from "axios";
import { IAnswer, IAnswerRequestData } from "../types";
import baseUrl from "./baseUrl";

/**
 * 파일을 제외한 json 형식의 답변 배열을 보내어 저장
 * @param answers IAnswer 배열
 * @returns 응답 배열?
 */
export const save = async (answers: IAnswerRequestData[]) => {
  const { data } = await axios.post(`${baseUrl}/answers`, answers);
  return data;
};

export const saveForm = async (answerForm: FormData) => {
  console.log("formdata", answerForm);
  const { data } = await axios.post(`${baseUrl}/answers/upload`, answerForm);
  return data;
};

export const saveAnswers = async (answer: FormData) => {
  const { data } = await axios.post(`${baseUrl}/answers`, answer);
  return data;
};

export const getAnswers = async (surveyId: string) => {
  const { data } = await axios.get(`${baseUrl}/answers/${surveyId}`);
  return data;
};

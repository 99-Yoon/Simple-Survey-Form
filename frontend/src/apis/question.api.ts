import axios from "axios";
import { BasicQuestionType } from "../types";
import baseUrl from "./baseUrl";

export const createQuestion = async () => {
  const { data } = await axios.post(`${baseUrl}/questions/create`, {
    type: "essay",
    title: "Question Title",
    isRequired: false,
    comment: "질문에 대한 설명을 입력해주세요",
    content: { choices: [] },
  });
  return data;
};

export const updateQuestion = async (question: BasicQuestionType) => {
  const { data } = await axios.post(`${baseUrl}/questions/update`, question);
  return data;
};

export const deleteQuestion = async (id: string) => {
  const { data } = await axios.post(`${baseUrl}/questions/delete`, { id: id });
  return data;
};

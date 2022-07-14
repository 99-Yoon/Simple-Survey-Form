import axios from "axios";
import { BasicQuestionType } from "../types";
import baseUrl from "./baseUrl";

export const createQuestion = async () => {
  const { data } = await axios.post(`${baseUrl}/questions/create`, {
    type: "essay",
    title: "",
    isRequired: false,
    comment: "",
    content: { choices: [] },
  });
  return data;
};

export const updateQuestion = async (question: BasicQuestionType) => {
  const { data } = await axios.put(
    `${baseUrl}/questions/update/${question._id}`,
    question
  );
  return data;
};

export const deleteQuestion = async (id: string) => {
  const { data } = await axios.delete(`${baseUrl}/questions/delete/${id}`);
  return data;
};

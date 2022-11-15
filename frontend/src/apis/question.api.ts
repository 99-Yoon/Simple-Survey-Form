import axios from "./axios.config";
import { IQuestionData } from "../types";
import baseUrl from "./baseUrl";

export const createQuestion = async (surveyId: string) => {
  const { data } = await axios.post(
    `${baseUrl}/surveys/${surveyId}/questions`,
    {
      type: "essay",
      title: "",
      isRequired: false,
      comment: "",
      content: { choices: [] },
    }
  );
  return data;
};

export const updateQuestion = async (question: IQuestionData) => {
  const { data } = await axios.put(
    `${baseUrl}/questions/update/${question._id}`,
    question
  );
  return data;
};

export const deleteQuestion = async (questionId: string) => {
  const { data } = await axios.delete(
    `${baseUrl}/questions/delete/${questionId}`
  );
  return data;
};

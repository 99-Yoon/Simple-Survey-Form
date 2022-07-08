import { Question, IQuestion } from "../models";

export const createQuestion = async (question: IQuestion) => {
  const newQuestion = await Question.create(question);
  return newQuestion;
};

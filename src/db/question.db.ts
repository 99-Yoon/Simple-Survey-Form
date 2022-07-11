import { Question, IQuestion } from "../models";

export const createQuestion = async (question: IQuestion) => {
  const newQuestion = await Question.create(question);
  return newQuestion;
};

export const updateQuestion = async (question: IQuestion) => {
  const id = question._id;
  const newQuestion = await Question.findOneAndUpdate({ _id: id }, question);
  return newQuestion;
};

export const deleteQuestion = async (id: string) => {
  const newQuestion = await Question.findByIdAndDelete(id);
  return newQuestion;
};

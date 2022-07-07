import { Question, IQuestion } from "../models";

export const createQuestion = async (question: IQuestion) => {
  const newQuestion = await Question.create(question);
  const newQ = {
    _id: newQuestion._id,
    type: newQuestion.type,
    title: newQuestion.title,
    isRequired: newQuestion.isRequired,
    comment: newQuestion.comment,
    content: newQuestion.content,
  }
  return newQ;
};

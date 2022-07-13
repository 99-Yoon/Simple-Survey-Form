import { Question, IQuestion } from "../models";

export const findUserByQuestionId = async (questionId: string) => {
  const question = await Question.findById(questionId).populate("user");
  console.log(question);
  if (question !== null) {
    console.log(question.user);
    return question.user;
  }
  return null;
};

export const createQuestion = async (question: IQuestion) => {
  const newQuestion = await Question.create(question);
  return newQuestion;
};

export const updateQuestion = async (question: IQuestion) => {
  const id = question._id;
  const newQuestion = await Question.findOneAndUpdate({ _id: id }, question);
  return newQuestion;
};

export const deleteQuestionById = async (id: string) => {
  const newQuestion = await Question.findByIdAndDelete(id);
  return newQuestion;
};

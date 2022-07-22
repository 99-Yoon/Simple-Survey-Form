import { Answer, IAnswer } from "../models";

export const createAnswer = async (answer: IAnswer) => {
  const newQuestion = await Answer.create(answer);
  return newQuestion;
};

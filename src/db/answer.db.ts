import { Answer, IAnswer } from "../models";
import { model, Schema, Types } from "mongoose";

export const createAnswer = async (answer: IAnswer) => {
  const newQuestion = await Answer.create(answer);
  return newQuestion;
};

export const getAnswers = async (surveyId: string) => {
  const answers = await Answer.aggregate([
    { $match: { surveyId: new Types.ObjectId(surveyId) } },
    {
      $lookup: {
        from: "questions",
        localField: "questionId",
        foreignField: "_id",
        as: "question",
      },
    },
    { $unwind: "$question" },
    {
      $group: {
        _id: "$questionId",
        answers: { $push: { guestId: "$guestId", answer: "$answer" } },
        question: { $mergeObjects: "$question" },
      },
    },
  ]);
  return answers;
};

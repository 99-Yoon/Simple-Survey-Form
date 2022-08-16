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
      $group: {
        _id: "$questionId",
        answers: { $push: "$content" },
      },
    },
    {
      $lookup: {
        from: "fileinfos",
        localField: "answers",
        foreignField: "_id",
        as: "file",
      },
    },
  ]);
  return answers;
};

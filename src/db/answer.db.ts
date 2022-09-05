import { Answer, IAnswer, Survey } from "../models";
import { model, Schema, Types } from "mongoose";

export const createAnswer = async (answer: IAnswer) => {
  const newQuestion = await Answer.create(answer);
  return newQuestion;
};

export const getAnswers = async (surveyId: string) => {
  const survey = await Survey.findById(surveyId).populate("questions");
  const result = await Answer.aggregate([
    // surveyId에 해당하는 답변들 find
    { $match: { surveyId: new Types.ObjectId(surveyId) } },

    // 같은 question에 대한 답변들을 answers[]에 push
    // {surveyId,questionId,guestId,content} => {_id:questionId, surveyId, answers:[content,content]}
    {
      $group: {
        _id: "$questionId",
        surveyId: { $first: "$surveyId" },
        answers: { $push: "$content" },
      },
    },

    // question DB popluate
    {
      $lookup: {
        from: "questions",
        localField: "_id",
        foreignField: "_id",
        as: "question",
      },
    },

    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$question", 0] }, "$$ROOT"],
        },
      },
    },
    { $unset: "question" },
    { $sort: { order: 1 } },
  ]);

  console.log("result:", result);

  if (survey && result[0]) {
    const Jsurvey = survey.toJSON();
    Jsurvey.questions = result;
    return Jsurvey;
  }
  return survey;
};

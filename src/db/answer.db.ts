import { Answer, IAnswer } from "../models";
import { model, Schema, Types } from "mongoose";

export const createAnswer = async (answer: IAnswer) => {
  const newQuestion = await Answer.create(answer);
  return newQuestion;
};

export const getAnswers = async (surveyId: string) => {
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
        as: "questionInfo",
      },
    },
    {
      $unwind: "$questionInfo",
    },

    // 질문 순서대로 정렬
    { $sort: { "questionInfo.order": 1 } },

    // surveyId로 묶고 questions 내에 { questionInfo, answers }[]
    {
      $group: {
        _id: "$surveyId",
        questions: {
          $push: { questionInfo: "$questionInfo", answers: "$answers" },
        },
      },
    },

    // survey DB populate
    {
      $lookup: {
        from: "surveys",
        localField: "_id",
        foreignField: "_id",
        as: "survey",
      },
    },
    {
      $unwind: "$survey",
    },

    //밖에 있던 questions를 survey 내부로 이동시키고 survey를 가장 root로 변경
    { $set: { "survey.questions": "$questions" } },
    { $replaceRoot: { newRoot: "$survey" } },
  ]);
  return result[0];
};

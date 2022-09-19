import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { questionDb, surveyDb } from "../db";
import { asyncWrap } from "../helpers/asyncWrap";
import { ISurvey } from "../models";

export interface TypedRequestAuth<T> extends Request {
  auth: T;
  user: any;
}

/**
 * 설문에 새로운 질문을 추가
 */
export const addQuestion = asyncWrap(async (reqExp: Request, res: Response) => {
  const req = reqExp as TypedRequestAuth<{ userId: string }>;
  // Question controller 이용 질문 생성
  const { userId } = req.auth;
  const { _id, ...questionInput } = req.body;
  questionInput.user = userId;
  const newQuestion = await questionDb.createQuestion(questionInput);

  // 생성된 질문을 survey에 추가
  const { surveyId } = req.params;
  await surveyDb.addQuestion(surveyId, newQuestion);
  res.json(newQuestion);
});

export const createSurvey = asyncWrap(
  async (reqExp: Request, res: Response) => {
    const req = reqExp as TypedRequestAuth<{ userId: string }>;
    const { userId } = req.auth;
    let survey = req.body as ISurvey;
    survey.user = new Types.ObjectId(userId);
    console.log("survey body", survey);
    const newSurvey = await surveyDb.createSurvey(survey);
    return res.json(newSurvey);
  }
);

export const deleteQuestion = asyncWrap(async (req, res) => {
  const { surveyId, questionId } = req.params;
  const deletedQuestion = await questionDb.deleteQuestionById(questionId);
  const survey = await surveyDb.removeQuestion(surveyId, questionId);
  return res.json(deletedQuestion);
});

export const deleteSurvey = asyncWrap(async (req, res) => {
  const { surveyId } = req.params;
  const survey = await surveyDb.deleteSurvey(surveyId);
  return res.json(survey);
});

export const getSurveyById = asyncWrap(async (req, res) => {
  const { surveyId } = req.params;
  const survey: any = await surveyDb.getSurveyById(surveyId);
  console.log("Get완료", survey);
  return res.json(survey);
});

export const getSurveys = asyncWrap(async (reqExp: Request, res: Response) => {
  const req = reqExp as TypedRequestAuth<{ userId: string }>;
  const { userId } = req.auth;
  const surveys = await surveyDb.getSurveys(userId);
  return res.json(surveys);
});

export const updateSurvey = asyncWrap(async (req, res) => {
  const survey = req.body;
  const updatedSurvey = await surveyDb.updateSurvey(survey);
  return res.json(updatedSurvey);
});

export const userBySurveyId = async (
  reqExp: Request,
  res: Response,
  next: NextFunction,
  surveyId: string
) => {
  try {
    const req = reqExp as TypedRequestAuth<{ userId: string }>;
    let user = await surveyDb.findUserBySurveyId(surveyId);
    if (!user) {
      return res.status(404).send("올바른 접근이 아닙니다.");
    } else {
      req.user = user;
      next();
    }
  } catch (error: any) {
    return res
      .status(500)
      .send(
        error.message || "설문조사를 작성한 사용자를 찾아내는 중 오류 발생"
      );
  }
};

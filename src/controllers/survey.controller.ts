import { NextFunction, Request, Response } from "express";
import { surveyDb } from "../db";
import { asyncWrap } from "../helpers/asyncWrap";

export interface TypedRequestAuth<T> extends Request {
  auth: T;
  user: any;
}

export const createSurvey = asyncWrap(
  async (reqExp: Request, res: Response) => {
    const req = reqExp as TypedRequestAuth<{ userId: string }>;
    const { userId } = req.auth;
    let survey = req.body;
    survey.user = userId;
    console.log("survey body", survey);
    const newSurvey = await surveyDb.createSurvey(survey);
    return res.json(newSurvey);
  }
);

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
  const newSurvey = await surveyDb.updateSurvey(survey);
  return res.json(newSurvey);
});

export const deleteSurvey = asyncWrap(async (req, res) => {
  const { surveyId } = req.params;
  const survey = await surveyDb.deleteSurvey(surveyId);
  return res.json(survey);
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

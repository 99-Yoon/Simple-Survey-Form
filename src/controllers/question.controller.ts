import { NextFunction, Request, Response } from "express";
import { questionDb } from "../db";
import { asyncWrap } from "../helpers/asyncWrap";

export interface TypedRequestAuth<T> extends Request {
  auth: T;
  user: any;
}

export const createQuestion = asyncWrap(
  async (reqExp: Request, res: Response, next: NextFunction) => {
    const req = reqExp as TypedRequestAuth<{ userId: string }>;
    const { userId } = req.auth;
    let question = req.body;
    question.user = userId;
    console.log("question body", question);
    const newQuestion = await questionDb.createQuestion(question);
    return res.json(newQuestion);
  }
);

export const updateQuestion = asyncWrap(async (req, res) => {
  const question = req.body;
  const newQuestion = await questionDb.updateQuestion(question);
  return res.json(newQuestion);
});

export const deleteQuestionById = asyncWrap(async (req, res) => {
  const { questionId } = req.params;
  const newQuestion = await questionDb.deleteQuestionById(questionId);
  return res.json(newQuestion);
});

export const userByQuestionId = async (
  reqExp: Request,
  res: Response,
  next: NextFunction,
  questionId: string
) => {
  try {
    const req = reqExp as TypedRequestAuth<{ userId: string }>;
    let user = await questionDb.findUserByQuestionId(questionId);
    if (!user) {
      return res.status(404).send("올바른 접근이 아닙니다");
    } else {
      req.user = user;
      next();
    }
  } catch (error: any) {
    return res
      .status(500)
      .send(error.message || "질문을 작성한 사용자를 찾아내는 중 오류 발생");
  }
};

import { NextFunction, Request, Response } from "express";
import { userDb } from "../db";
import { asyncWrap } from "../helpers/asyncWrap";
import { TypedRequestAuth } from "./auth.controller";

interface TypedRequest extends Request {
  auth: any;
  user: any;
  files: any;
}

export const createUser = asyncWrap(async (reqExp, res) => {
  const req = reqExp as TypedRequest;

  const user = req.body;
  console.log("user body", user);
  console.log("files ", req.files);
  const newUser = await userDb.createUser(user);
  return res.json(newUser);
});

export const deleteUser = asyncWrap(async (req, res) => {
  const { userId } = req.params;
  console.log("user id:", userId);
  const deletedUser = await userDb.deleteUserById(userId);
  return res.json(deletedUser);
});

export const getUsers = asyncWrap(async (req, res) => {
  const users = await userDb.getUsers();
  return res.json(users);
});

export const userById = async (
  reqExp: Request,
  res: Response,
  next: NextFunction,
  userId: string
) => {
  try {
    const req = reqExp as TypedRequestAuth<{ userId: string }>;
    let user = await userDb.findUserById(userId);
    if (!user) {
      return res.status(404).send("사용자를 찾을 수 없습니다");
    }
    req.user = user;
    next();
  } catch (error: any) {
    return res.status(500).send(error.message || "사용자 찾기 중 오류");
  }
};

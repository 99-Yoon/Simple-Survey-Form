import { NextFunction, Request, Response } from "express";
import formidable from "formidable";
import fs from "fs/promises";
import { fileDb, userDb } from "../db";
import { asyncWrap } from "../helpers/asyncWrap";
import { FileInfo } from "../models";
import { TypedRequest } from "../types";
import { TypedRequestAuth } from "./auth.controller";

export const createUser = asyncWrap(async (reqExp, res) => {
  const req = reqExp as TypedRequest;

  const user = req.body;
  // console.log("user body", user);
  // console.log("files ", req.files);
  const file = req.files.avatar as formidable.File;
  let avatar;
  try {
    // 1) 아바타 이미지 저장
    if (file) {
      avatar = new FileInfo({
        name: file.originalFilename,
        url: file.newFilename,
        isNew: true,
      });
      await fileDb.save(avatar);
      // 2) 사용자에 아바타 항목 추가
      user.avatar = avatar;
    }
    // 3) 사용자 만들기
    const newUser = await userDb.createUser(user);
    // 주의: ref는 반드시 save를 해야 디비에 생성이 됩니다.
    return res.json(newUser);
  } catch (error: any) {
    console.log("error in create user:", error);
    // 오류 발생시 저장된 파일 제거
    if (file) {
      avatar && (await fileDb.deleteFileById(avatar._id.toString()));
      await fs.unlink(file.filepath);
    }
    res.status(422).send(error.message || "사용자 생성 오류");
  }
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

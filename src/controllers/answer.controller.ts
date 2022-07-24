import { NextFunction, Request, Response } from "express";
import { asyncWrap } from "../helpers";
import { TypedRequest } from "../types";
import formidable from "formidable";
import { FileInfo } from "../models";
import { fileDb, userDb, answerDb } from "../db";
import fs from "fs/promises";

export const createAnswers = asyncWrap(async (reqExp, res) => {
  const req = reqExp as TypedRequest;
  const answer = req.body;
  const answers = JSON.parse(answer.answers);
  answer.answers = answers;
  const files = req.files.uploadFiles as formidable.File[];
  let uploadFile;
  try {
    if (files) {
      // 1) 파일을 DB에 저장 후 다시 retFile가져와서
      // *근데 파일이 여러 개일 수 있기 때문에 순회해야 됨-map()을 쓰면 async function이 되어버려서 for문 이용함
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        uploadFile = new FileInfo({
          name: file.originalFilename,
          url: file.newFilename,
          isNew: true,
        });
        const retFile = await fileDb.createFile(file);
        // 2) answers의 type이 file인 친구들 찾아서 그 친구의 answer와 filename을 비교 후 같으면
        const targetObj = answer.answers.find(
          (ans: any) => ans.answer === file.originalFilename
        );
        // 3) answer에다가 retFile의 _id 넣어주기
        targetObj.answer = retFile._id;
      }
    }
    // 3) Answer DB 만들기
    console.log("원래 answer", answer);
    console.log("원래 answer", answer.answers.length);
    // for (let index = 0; index < answer.answers.length; index++) {
    //   const element = answer.answers[index];
    //   const newAnswer = await answerDb.createAnswer({
    //     surveyId: answer.surveyId,
    //     guestId: answer.guestId,
    //     questionId: element.questionId,
    //     answer: element.answer,
    //   });
    //   // console.log("DB에 넣은 answer", newAnswer);
    // }
    return res.json();
  } catch (error: any) {
    console.log("error in create answer:", error);
    // 오류 발생시 저장된 파일 제거
    if (files) {
      //   uploadFiles && (await fileDb.deleteFileById(uploadFiles._id.toString()));
      // await fs.unlink(files.filepath);
    }
    res.status(422).send(error.message || "설문조사 응답 생성 오류");
  }
});

export const getAnswers = asyncWrap(async (reqExp, res) => {
  const req = reqExp as TypedRequest;
  const { surveyId } = req.params;
  console.log(surveyId);
  try {
    const answers = await answerDb.getAnswers(surveyId);
    console.log("Db에서 가져온 answers= ", answers);
    return res.json(answers);
  } catch (error: any) {
    res.status(422).send(error.message || "설문조사 결과 불러오기 오류");
  }
});

import { NextFunction, Request, Response } from "express";
import { asyncWrap, formidableFilesToArray, isEmpty } from "../helpers";
import type { TypedRequest } from "../types";
import formidable from "formidable";
import { FileInfo, IAnswer } from "../models";
import { fileDb, userDb, answerDb, surveyDb } from "../db";
import fs from "fs/promises";

export const createAnswers = asyncWrap(async (reqExp, res) => {
  const req = reqExp as TypedRequest;
  const answer = req.body;
  console.log("answer in create answers:", answer);
  const answers = JSON.parse(answer.answers);
  answer.answers = answers;
  let files: any[] = [];
  if (Array.isArray(req.files.uploadFiles)) {
    files = req.files.uploadFiles as formidable.File[];
  } else {
    if (!isEmpty(req.files)) {
      files.push(req.files.uploadFiles);
    }
  }
  let uploadFile;
  try {
    if (files.length > 0) {
      console.log("files in answer controller:", files);
      // 1) 파일을 DB에 저장 후 다시 retFile가져와서
      // *근데 파일이 여러 개일 수 있기 때문에 순회해야 됨
      const f = files.map(async (file) => {
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
      });
      await Promise.all(f);
    }
    // 3) Answer DB 만들기
    const c = answer.answers.map(async (element: any) => {
      const newAnswer = await answerDb.createAnswer({
        surveyId: answer.surveyId,
        guestId: answer.guestId,
        questionId: element.questionId,
        content: element.answer,
      });
    });
    await Promise.all(c);
    return res.json();
  } catch (error: any) {
    console.log("error in create answer:", error);
    // 오류 발생시 저장된 파일 제거
    if (req.files) {
      //   uploadFiles && (await fileDb.deleteFileById(uploadFiles._id.toString()));
      // await fs.unlink(files.filepath);
    }
    res.status(422).send(error.message || "설문조사 응답 생성 오류");
  }
});

export const createAnswersWithoutFile = asyncWrap(async (req, res) => {
  const answers = req.body as IAnswer[];
  const newAnswers = await Promise.all(
    answers.map(
      async (answer) =>
        await answerDb.createAnswer({
          surveyId: answer.surveyId,
          guestId: answer.guestId,
          questionId: answer.questionId,
          content: answer.content,
        })
    )
  );

  console.log("new answers:", newAnswers);
  res.json(newAnswers);
});

export const createAnswerWithFile = asyncWrap(async (reqExp, res) => {
  const req = reqExp as TypedRequest;

  console.log("body:", req.body, "files:", req.files);
  const answer = req.body;

  let fileInfos;
  const files = formidableFilesToArray(req.files.uploadFiles);
  console.log("files=", files);
  if (files) {
    fileInfos = await Promise.all(
      files.map(async (file) => await fileDb.createFile(file))
    );
  }

  answer.content = fileInfos;
  const newAnswer = await answerDb.createAnswer(answer);

  console.log("new answer:", newAnswer);
  res.json(newAnswer);
});

// export const getAnswers = asyncWrap(async (reqExp, res) => {
//   const req = reqExp as TypedRequest;
//   const { surveyId } = req.params;
//   try {
//     const survey = await surveyDb.getSurveyById(surveyId);
//     const answers = await answerDb.getAnswers(surveyId);
//     console.log(answers);
//     const jsonSurvey = survey?.toJSON();
//     if (jsonSurvey && answers) {
//       const a = answers.map(async (a) => {
//         const targetObj = jsonSurvey.questions.find(
//           (q: any) => String(q._id) === String(a._id)
//         ) as any;
//         if (targetObj) {
//           if (a.file.length) {
//             targetObj.answers = a.file;
//           } else {
//             targetObj.answers = a.answers;
//           }
//         }
//       });
//       await Promise.all(a);
//     }
//     return res.json(jsonSurvey);
//   } catch (error: any) {
//     res.status(422).send(error.message || "설문조사 결과 불러오기 오류");
//   }
// });
export const getAnswers = asyncWrap(async (reqExp, res) => {
  const req = reqExp as TypedRequest;
  const { surveyId } = req.params;
  try {
    const result = await answerDb.getAnswers(surveyId);
    console.log("result===", result);
    return res.json(result);
  } catch (error: any) {
    res.status(422).send(error.message || "설문조사 결과 불러오기 오류");
  }
});

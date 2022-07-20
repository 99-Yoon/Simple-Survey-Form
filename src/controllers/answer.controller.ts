import { asyncWrap } from "../helpers";
import { TypedRequest } from "../types";
import formidable from "formidable";
import { FileInfo } from "../models";
import { fileDb, userDb } from "../db";
import fs from "fs/promises";

export const createAnswers = asyncWrap(async (reqExp, res) => {
  const req = reqExp as TypedRequest;
  const answer = req.body;
  const answers = JSON.parse(answer.answers);
  answer.answers = answers;
  console.log(answers);
  const file = req.files.img as formidable.File;
  let img;
  try {
    // 1) 파일을 DB에 저장
    if (file) {
      //   img = new FileInfo({
      //     name: file.originalFilename,
      //     url: file.newFilename,
      //     isNew: true,
      //   });
      //   await fileDb.createFile(file);
      // 2) answer에 img 항목 추가
      answer.img = img;
    }
    // 3) Answer 만들기(map을 돌려서 하나씩 추가시켜야 함)
    console.log(answer);
    //   const newAnswer = await answerDb.createAnswer(answer);
    // 주의: ref는 반드시 save를 해야 디비에 생성이 됩니다.
    return res.json();
  } catch (error: any) {
    console.log("error in create user:", error);
    // 오류 발생시 저장된 파일 제거
    if (file) {
      //   img && (await fileDb.deleteFileById(img._id.toString()));
      await fs.unlink(file.filepath);
    }
    res.status(422).send(error.message || "사용자 생성 오류");
  }
});

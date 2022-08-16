import express from "express";
import { answerCtrl, authCtrl, fileCtrl, surveyCtrl } from "../controllers";

const router = express.Router();

router.route("/").post(answerCtrl.createAnswersWithoutFile);

router
  .route("/upload")
  .post(fileCtrl.uploadFile, answerCtrl.createAnswerWithFile);

router
  .route("/:surveyId")
  .get(authCtrl.requireLogin, authCtrl.authenticate, answerCtrl.getAnswers);

router.param("surveyId", surveyCtrl.userBySurveyId);

export default router;

import express from "express";
import { answerCtrl, authCtrl, fileCtrl, surveyCtrl } from "../controllers";

const router = express.Router();

router.route("/").post(fileCtrl.uploadFile, answerCtrl.createAnswers);
router
  .route("/:surveyId")
  .get(authCtrl.requireLogin, authCtrl.authenticate, answerCtrl.getAnswers);

router.param("surveyId", surveyCtrl.userBySurveyId);

export default router;

import express from "express";
import { authCtrl, surveyCtrl, questionCtrl } from "../controllers";

const router = express.Router();

router
  .route("/")
  .get(authCtrl.requireLogin, surveyCtrl.getSurveys)
  .post(authCtrl.requireLogin, surveyCtrl.createSurvey);

router
  .route("/:surveyId")
  .get(authCtrl.requireLogin, authCtrl.authenticate, surveyCtrl.getSurveyById)
  .put(authCtrl.requireLogin, authCtrl.authenticate, surveyCtrl.updateSurvey)
  .delete(
    authCtrl.requireLogin,
    authCtrl.authenticate,
    surveyCtrl.deleteSurvey
  );

router
  .route("/:surveyId/questions")
  .post(
    authCtrl.requireLogin,
    authCtrl.authenticate,
    questionCtrl.createQuestion
  );

router.param("surveyId", surveyCtrl.userBySurveyId);

export default router;

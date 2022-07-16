import express from "express";
import { authCtrl, surveyCtrl } from "../controllers";

const router = express.Router();

router.route("/").get(authCtrl.requireLogin, surveyCtrl.getSurveys);
router.route("/create").post(authCtrl.requireLogin, surveyCtrl.createSurvey);
router
  .route("/edit/:surveyId")
  .get(authCtrl.requireLogin, authCtrl.authenticate, surveyCtrl.getSurveyById)
  .put(authCtrl.requireLogin, authCtrl.authenticate, surveyCtrl.updateSurvey);
router
  .route("/delete/:surveyId")
  .delete(
    authCtrl.requireLogin,
    authCtrl.authenticate,
    surveyCtrl.deleteSurvey
  );

router.param("surveyId", surveyCtrl.userBySurveyId);

export default router;

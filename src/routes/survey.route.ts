import express from "express";
import { authCtrl, surveyCtrl, questionCtrl } from "../controllers";

const router = express.Router();

router.route("/").get(authCtrl.requireLogin, surveyCtrl.getSurveys);
router.route("/:surveyId")
.get(surveyCtrl.getSurveyById);



router.route("/create").post(authCtrl.requireLogin, surveyCtrl.createSurvey);
router
  .route("/:surveyId")
  .get(surveyCtrl.getSurveyById);
router
  .route("/edit/:surveyId")
  .get(authCtrl.requireLogin, authCtrl.authenticate, surveyCtrl.getSurveyById)
  .put(authCtrl.requireLogin, authCtrl.authenticate, surveyCtrl.updateSurvey);
router
  .route("/:surveyId/delete")
  .delete(
    authCtrl.requireLogin,
    authCtrl.authenticate,
    surveyCtrl.deleteSurvey
  );

router
  .route("/:surveyId/questions")
  .post(authCtrl.requireLogin, questionCtrl.createQuestion);

router.param("surveyId", surveyCtrl.userBySurveyId);

export default router;

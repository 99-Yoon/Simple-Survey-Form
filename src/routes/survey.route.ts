import express from "express";
import { surveyCtrl } from "../controllers";

const router = express.Router();

router
  .route("/create")
  .post(surveyCtrl.createSurvey);

export default router;

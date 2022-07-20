import express from "express";
import { answerCtrl, fileCtrl } from "../controllers";

const router = express.Router();

router.route("/").post(fileCtrl.uploadFile, answerCtrl.createAnswers);

export default router;

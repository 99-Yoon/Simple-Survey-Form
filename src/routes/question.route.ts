import express from "express";
import { questionCtrl } from "../controllers";

const router = express.Router();

router.route("/create").post(questionCtrl.createQuestion);
router.route("/update").post(questionCtrl.updateQuestion);
router.route("/delete").post(questionCtrl.deleteQuestion);

export default router;

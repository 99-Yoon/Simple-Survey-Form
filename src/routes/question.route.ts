import express from "express";
import { questionCtrl } from "../controllers";

const router = express.Router();

router
  .route("/create")
  .post(questionCtrl.createQuestion);

export default router;

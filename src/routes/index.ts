import express from "express";
import authRouter from "./auth.route";
import questionRouter from "./question.route";
import surveyRouter from "./survey.route";
import roleRouter from "./role.route";
import userRouter from "./user.route";
import answerRouter from "./answer.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/questions", questionRouter);
router.use("/surveys", surveyRouter);
router.use("/roles", roleRouter);
router.use("/users", userRouter);
router.use("/answers", answerRouter);

export default router;

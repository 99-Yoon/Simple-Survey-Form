import express from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import questionRouter from "./question.route";

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/questions", questionRouter)

export default router;

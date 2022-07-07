import express from "express";
import authRouter from "./auth.route";
import questionRouter from "./question.route";
import roleRouter from "./role.route";
import userRouter from "./user.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/questions", questionRouter);
router.use("/roles", roleRouter);
router.use("/users", userRouter);

export default router;

import express from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import roleRouter from "./role.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/roles", roleRouter);
router.use("/users", userRouter);

export default router;

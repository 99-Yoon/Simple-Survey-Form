import express from "express";
import { authCtrl } from "../controllers";

const router = express.Router();

router.route("/signup").post(authCtrl.signup);
router.route("/login").post(authCtrl.login);
router.route("/logout").get(authCtrl.logout);

export default router;

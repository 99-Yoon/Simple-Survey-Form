import express from "express";
import { authCtrl } from "../controllers";

const router = express.Router();

router.route("/signup").post(authCtrl.signup);
router.route("/login").post(authCtrl.login);
router.route("/login/kakao").get(authCtrl.kakaoLogin);
router.route("/logout").get(authCtrl.logout);

router.route("/oauth/kakao").post(authCtrl.kakaoAuthenticate);

export default router;

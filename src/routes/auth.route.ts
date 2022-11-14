import express from "express";
import { authCtrl } from "../controllers";

const router = express.Router();

router.route("/signup").post(authCtrl.signup);
router.route("/login").post(authCtrl.login);
router.route("/logout").get(authCtrl.logout);

router.route("/oauth").post(authCtrl.saveOauthKeys);

router.route("/oauth/kakao").post(authCtrl.kakaoAuthenticate);

export default router;

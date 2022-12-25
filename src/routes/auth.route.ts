import express from "express";
import { authCtrl } from "../controllers";

const router = express.Router();

router.route("/signup").post(authCtrl.signup);
router.route("/login").post(authCtrl.login);
router.route("/logout").get(authCtrl.logout);

router.route("/oauth").post(authCtrl.saveOauthKeys);

router.route("/oauth/kakao/token").post(authCtrl.kakaoAuthenticate);

router.route("/oauth/:socialType").get(authCtrl.getOauthKeys);

// router.param("socialType", authCtrl.getOauthKeys);

export default router;

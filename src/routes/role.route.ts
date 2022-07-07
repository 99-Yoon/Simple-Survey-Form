import express from "express";
import { authCtrl, roleCtrl } from "../controllers";

const router = express.Router();

router.all("/", authCtrl.requireLogin);

router.route("/").get(authCtrl.hasRole("admin"), roleCtrl.getRoles);

export default router;

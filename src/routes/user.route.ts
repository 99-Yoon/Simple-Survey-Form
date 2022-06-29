import express from "express";
import { userCtrl, authCtrl } from "../controllers";

const router = express.Router();

router
  .route("/")
  .get(authCtrl.requireLogin, userCtrl.getUsers)
  .post(authCtrl.requireLogin, userCtrl.createUser);

export default router;

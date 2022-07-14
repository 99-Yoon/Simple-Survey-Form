import express from "express";
import { userCtrl, authCtrl, fileCtrl } from "../controllers";

const router = express.Router();

router
  .route("/")
  .get(authCtrl.requireLogin, userCtrl.getUsers)
  .post(authCtrl.requireLogin, fileCtrl.fileUpload, userCtrl.createUser);

router
  .route("/:userId")
  .delete(authCtrl.requireLogin, authCtrl.authenticate, userCtrl.deleteUser);

router.param("userId", userCtrl.userById);

export default router;

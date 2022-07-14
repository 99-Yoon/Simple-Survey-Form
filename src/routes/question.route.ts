import express from "express";
import { authCtrl, questionCtrl } from "../controllers";

const router = express.Router();

router
  .route("/create")
  .post(authCtrl.requireLogin, questionCtrl.createQuestion);
router
  .route("/update/:questionId")
  .put(
    authCtrl.requireLogin,
    authCtrl.authenticate,
    questionCtrl.updateQuestion
  );
router
  .route("/delete/:questionId")
  .delete(
    authCtrl.requireLogin,
    authCtrl.authenticate,
    questionCtrl.deleteQuestionById
  );

router.param("questionId", questionCtrl.userByQuestionId);

export default router;

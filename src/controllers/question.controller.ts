import { questionDb } from "../db";
import { asyncWrap } from "../helpers/asyncWrap";

export const createQuestion = asyncWrap(async (req, res) => {
  const question = req.body;
  console.log("question body", question);
  const newQuestion = await questionDb.createQuestion(question);
  return res.json(newQuestion);
});

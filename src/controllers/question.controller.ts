import { questionDb } from "../db";
import { asyncWrap } from "../helpers/asyncWrap";

export const createQuestion = asyncWrap(async (req, res) => {
  const question = req.body;
  console.log("question body", question);
  const newQuestion = await questionDb.createQuestion(question);
  return res.json(newQuestion);
});

export const updateQuestion = asyncWrap(async (req, res) => {
  const question = req.body;
  console.log("question body", question);
  const newQuestion = await questionDb.updateQuestion(question);
  return res.json(newQuestion);
});

export const deleteQuestion = asyncWrap(async (req, res) => {
  const { id } = req.body;
  console.log("Id: ", id);
  const newQuestion = await questionDb.deleteQuestion(id);
  return res.json(newQuestion);
});

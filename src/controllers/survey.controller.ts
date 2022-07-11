import { surveyDb } from "../db";
import { asyncWrap } from "../helpers/asyncWrap";

export const createSurvey = asyncWrap(async (req, res) => {
  const survey = req.body;
  console.log("Survey body", survey);
  const newSurvey = await surveyDb.createSurvey(survey);
  return res.json(newSurvey);
});

export const getSurveys = asyncWrap(async (req, res) => {
  const surveys = await surveyDb.getSurveys();
  return res.json(surveys);
});

import { Survey, ISurvey } from "../models";

export const createSurvey = async (survey: ISurvey) => {
  const newSurvey = await Survey.create(survey);
  return newSurvey;
};

export const getSurveys = async () => {
  const surveys = await Survey.find({}).populate("questions")
  return surveys
}
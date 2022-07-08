import { Survey, ISurvey } from "../models";

export const createSurvey = async (survey: ISurvey) => {
  const newSurvey = await Survey.create(survey);
  return newSurvey;
};

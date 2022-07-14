import { Survey, ISurvey } from "../models";

export const findUserBySurveyId = async (surveyId: string) => {
  const survey = await Survey.findById(surveyId).populate("user");
  console.log(survey);
  if (survey !== null) {
    console.log(survey.user);
    return survey.user;
  }
  return null;
};

export const createSurvey = async (survey: ISurvey) => {
  const newSurvey = await Survey.create(survey);
  return newSurvey;
};

export const getSurveyById = async (surveyId: string) => {
  console.log("survey id", surveyId);
  const survey = await Survey.findById(surveyId).populate("questions");
  return survey;
};
export const getSurveys = async () => {
  const surveys = await Survey.find();
  return surveys;
};

export const updateSurvey = async (survey: ISurvey) => {
  const newSurvey = await Survey.findOneAndUpdate({ _id: survey._id }, survey);
  return newSurvey;
};

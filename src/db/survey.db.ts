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

export const getSurveys = async (userId: string) => {
  const surveys = await Survey.find({ user: userId }).sort({ updatedAt: -1 });
  return surveys;
};

export const updateSurvey = async (survey: ISurvey) => {
  const newSurvey = await Survey.findOneAndUpdate({ _id: survey._id }, survey);
  return newSurvey;
};

export const deleteSurvey = async (surveyId: string) => {
  console.log("survey id", surveyId);
  const survey = await Survey.findOneAndDelete({ _id: surveyId });
  return survey;
};

export const putNewQuestion = async (newQuestion: any, surveyId: string) => {
  console.log(newQuestion, surveyId);
  if (newQuestion !== null) {
    const updatedSurvey = await Survey.findOneAndUpdate(
      { _id: surveyId },
      { $push: { questions: newQuestion } },
      { new: true }
    ).populate("questions");
    return updatedSurvey;
  }
  return null;
};

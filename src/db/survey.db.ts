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
  const surveys = await Survey.find({ user: userId });
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

// export const isSurvey = async (surveyId: string) =>{
//   const survey = await Survey.findOne({surveyId});
//   if (survey) {
//     return true;    
//   } else {
//     return false;
//   }
// }
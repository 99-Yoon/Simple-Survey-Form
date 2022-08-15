import { HydratedDocument } from "mongoose";
import { Survey, ISurvey, Question, IQuestion } from "../models";

export const findUserBySurveyId = async (surveyId: string) => {
  const survey = await Survey.findById(surveyId).populate("user");
  console.log(survey);
  if (survey !== null) {
    console.log(survey.user);
    return survey.user;
  }
  return null;
};

export const createSurvey = async (surveyData: ISurvey) => {
  const { _id, questions, ...rest } = surveyData;
  console.log("questions in survey db:", questions, "rest:", rest);
  let newQuestions;
  // questions 있으면 먼저 저장
  if (questions && questions.length > 0) {
    newQuestions = await Promise.all(
      questions.map(async (question) => {
        const { _id, ...questionsWithoutId } = question;
        return await Question.create(questionsWithoutId);
      })
    );
  }
  const survey = new Survey({
    ...rest,
    questions: newQuestions,
  });
  const newSurvey = await (await survey.save()).populate("questions");
  return newSurvey;
};

export const getSurveyById = async (surveyId: string) => {
  console.log("survey id", surveyId);
  const survey = await Survey.findById(surveyId).populate("questions");
  return survey;
};

export const getSurveys = async (userId: string) => {
  const surveys = await Survey.find({ user: userId })
    .sort({ updatedAt: -1 })
    .populate("questions");
  return surveys;
};

export const updateSurvey = async (survey: HydratedDocument<ISurvey>) => {
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

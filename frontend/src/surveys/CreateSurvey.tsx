import React from "react";
import { surveyApi } from "../apis";
import { ISurvey } from "../types";
import { ModifySurvey } from "./ModifySurvey";

export const CreateSurvey = () => {
  const surveyData = {
    _id: "",
    user: "",
    title: "",
    comment: "",
    questions: [],
  };

  const create = async (surveyData: ISurvey) => {
    const result = await surveyApi.createSurvey(surveyData);
    return result;
  };

  return <ModifySurvey surveyData={surveyData} callApi={create} />;
};

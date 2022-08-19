import React from "react";
import { surveyApi } from "../apis";
import { useSurveys } from "../layouts";
import { ISurvey } from "../types";
import { ModifySurvey } from "./ModifySurvey";

export const CreateSurvey = () => {
  const { error, loading, create } = useSurveys();

  const surveyData = {
    _id: "",
    user: "",
    title: "",
    comment: "",
    questions: [],
  };

  // const create = async (surveyData: ISurvey) => {
  //   const result = await surveyApi.createSurvey(surveyData);
  //   return result;
  // };

  return <ModifySurvey surveyData={surveyData} callApi={create} />;
};

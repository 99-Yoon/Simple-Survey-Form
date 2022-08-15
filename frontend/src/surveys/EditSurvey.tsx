import React from "react";
import { useLocation } from "react-router-dom";
import { surveyApi } from "../apis";
import { ISurvey } from "../types";
import { ModifySurvey } from "./ModifySurvey";

export const EditSurvey = () => {
  const location = useLocation();
  const surveyState = location.state as ISurvey;
  console.log("edit survey:", surveyState);

  const update = async (surveyData: ISurvey) => {
    const result = await surveyApi.updateSurvey(surveyData);
    return result;
  };

  return <ModifySurvey surveyData={surveyState} callApi={update} />;
};

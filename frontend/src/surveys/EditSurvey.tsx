import React, { useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { surveyApi } from "../apis";
import { ISurvey } from "../types";
import { ModifySurvey } from "./ModifySurvey";
import { useSurvey } from "../layouts/SurveyLayout";

export const EditSurvey = () => {
  const { survey, update } = useSurvey();
  // const [survey, setSurvey] = useState(surveyData);

  console.log("survey", survey);
  // const location = useLocation();
  // const surveyState = location.state as ISurvey;
  // console.log("edit survey:", surveyState);

  // const update = async (surveyData: ISurvey) => {
  //   const result = await surveyApi.updateSurvey(surveyData);
  //   return result;
  // };

  if (!survey) {
    return <Navigate to={"/surveys"} />;
  }

  return <ModifySurvey surveyData={survey} callApi={update} />;
};

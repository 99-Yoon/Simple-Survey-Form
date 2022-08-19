import React from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSurveys } from "./SurveysLayout";
import type { ISurvey } from "../types";

type SurveyContextType = {
  survey: ISurvey;
  update: (survey: ISurvey) => Promise<any>;
};

const activeStyle =
  "w-36 h-12 flex justify-center items-center bg-themeColor p-1 text-white text-center font-bold text-xl";
const inActiveStyle =
  "w-36 h-12 flex justify-center items-center bg-white border border-themeColor p-1 text-center font-bold text-xl";

export const SurveyLayout = () => {
  const { surveys, update } = useSurveys();
  let { surveyId } = useParams<{ surveyId: string }>();
  const survey = surveys.find((survey) => survey._id === surveyId);

  return (
    <div>
      <div className="flex justify-center items-center mt-6">
        <NavLink
          to={`/surveys/${surveyId}`}
          end={true}
          className={({ isActive }) =>
            isActive
              ? activeStyle + " rounded-l-3xl"
              : inActiveStyle + " rounded-l-3xl"
          }
        >
          설문 미리보기
        </NavLink>
        <NavLink
          to={`/surveys/${surveyId}/edit`}
          className={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
        >
          설문지 수정
        </NavLink>
        <NavLink
          to={`/surveys/${surveyId}/result`}
          className={({ isActive }) =>
            isActive
              ? activeStyle + " rounded-r-3xl"
              : inActiveStyle + " rounded-r-3xl"
          }
        >
          응답결과
        </NavLink>
      </div>
      <Outlet context={{ survey, update }} />
    </div>
  );
};

export const useSurvey = () => {
  return useOutletContext<SurveyContextType>();
};

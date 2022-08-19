import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { surveyApi } from "../apis";
import { catchErrors } from "../helpers";
import type { ISurvey } from "../types";

type SurveysContextType = {
  error: string;
  loading: boolean;
  surveys: ISurvey[];
  create: () => Promise<any>;
  remove: (id: string) => Promise<any>;
  update: (survey: ISurvey) => Promise<any>;
};

export const SurveysLayout = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [surveys, setSurveys] = useState<ISurvey[]>([]);

  useEffect(() => {
    const getSurveys = async () => {
      const surveys: ISurvey[] = await surveyApi.getSurveys();
      // console.log(surveys);
      setSurveys(surveys);
    };
    getSurveys();
  }, []);

  const create = async (surveyData: ISurvey) => {
    const result: ISurvey = await surveyApi.createSurvey(surveyData);
    setSurveys([result, ...surveys]);
    return result;
  };

  const update = async (surveyData: ISurvey) => {
    const result = await surveyApi.updateSurvey(surveyData);
    const index = surveys.findIndex((survey) => survey._id === result._id);
    surveys[index] = result;
    console.log("result in modify layout:", result);
    setSurveys([...surveys]);
    return result;
  };

  /**
   * 설문 삭제
   * @param id survey id
   */
  const remove = async (id: string) => {
    if (window.confirm("해당 설문조사를 삭제하시겠습니까?")) {
      try {
        setLoading(true);
        const result = await surveyApi.deleteSurvey(id);
        console.log("deleted survey", result);
        setError("");
        const items = surveys.filter((survey) => survey._id !== result._id);
        // console.log("items left:", newItems);
        setSurveys(items);
        alert("삭제되었습니다.");
      } catch (error) {
        console.log("에러발생");
        catchErrors(error, setError);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Outlet context={{ error, loading, surveys, create, remove, update }} />
    </>
  );
};

export const useSurveys = () => {
  return useOutletContext<SurveysContextType>();
};

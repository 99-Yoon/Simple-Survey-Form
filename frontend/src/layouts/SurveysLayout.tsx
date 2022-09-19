import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { surveyApi } from "../apis";
import { catchErrors } from "../helpers";
import type { ICreateSurvey, ISurvey } from "../types";

type SurveysContextType = {
  error: string;
  loading: boolean;
  surveys: ICreateSurvey[];
  create: () => Promise<any>;
  remove: (id: string) => Promise<any>;
  update: (survey: ICreateSurvey) => Promise<any>;
  updateLocalSurveysList: (survey: ICreateSurvey) => void;
};

export const SurveysLayout = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [surveys, setSurveys] = useState<ICreateSurvey[]>([]);

  useEffect(() => {
    const getSurveys = async () => {
      const surveys: ICreateSurvey[] = await surveyApi.getSurveys();
      // console.log(surveys);
      setSurveys(surveys);
    };
    getSurveys();
  }, []);

  const create = async (surveyData: ISurvey) => {
    const result: ICreateSurvey = await surveyApi.createSurvey(surveyData);
    setSurveys([result, ...surveys]);
    return result;
  };

  /**
   * 수정된 설문 객체를 적용한 새로운 설문 배열 생성하여 리랜더링
   * @param surveyData 바꾸려는 설문 객체
   */
  const update = async (surveyData: ICreateSurvey) => {
    const result = await surveyApi.updateSurvey(surveyData);
    const index = surveys.findIndex((survey) => survey._id === result._id);
    surveys[index] = result;
    // const index = surveys.findIndex((survey) => survey._id === surveyData._id);
    // surveys[index] = surveyData;
    // console.log("update in surveys layout layout:", surveyData);
    console.log("updated survey data:", result);
    setSurveys([...surveys]);
    // return result;
  };

  const updateLocalSurveysList = (surveyData: ICreateSurvey) => {
    const index = surveys.findIndex((survey) => survey._id === surveyData._id);
    surveys[index] = surveyData;
    // const index = surveys.findIndex((survey) => survey._id === surveyData._id);
    // surveys[index] = surveyData;
    // console.log("update in surveys layout layout:", surveyData);
    console.log("updated local survey data:", surveyData);
    setSurveys([...surveys]);
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
      <Outlet
        context={{
          error,
          loading,
          surveys,
          create,
          remove,
          update,
          updateLocalSurveysList,
        }}
      />
    </>
  );
};

export const useSurveys = () => {
  return useOutletContext<SurveysContextType>();
};

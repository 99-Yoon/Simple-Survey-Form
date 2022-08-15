import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { surveyApi } from "../apis";
import { catchErrors } from "../helpers";
import { ISurvey } from "../types";
import { SurveyCard } from "./SurveyCard";

export const Profile = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [surveys, setSurveys] = useState<ISurvey[]>([]);

  useEffect(() => {
    getSurveys();
  }, []);

  async function getSurveys() {
    const surveys: ISurvey[] = await surveyApi.getSurveys();
    // console.log(surveys);
    setSurveys(surveys);
  }

  async function deleteSurvey(id: string) {
    if (window.confirm("해당 설문조사를 삭제하시겠습니까?")) {
      try {
        setLoading(true);
        const result = await surveyApi.deleteSurvey(id);
        console.log("deleted survey", result);
        setError("");
        const newItems = surveys.filter((survey) => survey._id !== result._id);
        // console.log("items left:", newItems);
        setSurveys(newItems);
        alert("삭제되었습니다.");
      } catch (error) {
        console.log("에러발생");
        catchErrors(error, setError);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 text-xl font-bold">나의 설문조사</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        <Link
          to={"/surveys/create"}
          className="flex w-40 h-48 md:h-60 md:w-52 items-center font-bold bg-gray-200 hover:bg-themeColor rounded-lg "
        >
          <div className="text-center md:px-6 md:py-6 font-xs md:font-bold text-gray-500 place-items-center hover:text-white">
            CREATE NEW SURVEY!
          </div>
        </Link>
        {surveys.map((survey) => {
          return (
            <SurveyCard
              survey={survey}
              key={survey._id}
              handleDelete={deleteSurvey}
            />
          );
        })}
      </div>
    </div>
  );
};

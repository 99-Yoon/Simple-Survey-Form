import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseImageUrl, surveyApi } from "../apis";
import { SurveyType } from "../types";
import { MySurveyCard } from "./MySurveyCard";

export const Profile = () => {
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<SurveyType>({
    _id: "",
    user: {},
    title: "",
    comment: "",
    questions: [],
  });
  const [cardDatas, setCardDatas] = useState<SurveyType[]>([]);

  useEffect(() => {
    getSurveys();
  }, []);

  async function createSurvey() {
    const newSurvey: SurveyType = await surveyApi.createSurvey(survey);
    navigate(`/surveys/${newSurvey._id}/edit`, {
      replace: true,
    });
  }

  async function getSurveys() {
    const surveys: SurveyType[] = await surveyApi.getSurveys();
    console.log(surveys);
    setCardDatas(surveys);
  }
  // let surveys = getSurvey(_id);

  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 text-xl font-bold">나의 설문조사</div>
      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 mt-6">
        <button
          onClick={createSurvey}
          className="flex h-60 w-52 items-center border-2 border-themeColor font-bold bg-gray-200 hover:bg-themeColor rounded-lg "
        >
          <div className="text-center px-6 py-6 font-bold text-gray-500 place-items-center hover:text-white">
            CREATE NEW SURVEY!
          </div>
        </button>
        {cardDatas.map((data, index) => {
          return <MySurveyCard data={data} key={index} />;
        })}
      </div>
    </div>
  );
};

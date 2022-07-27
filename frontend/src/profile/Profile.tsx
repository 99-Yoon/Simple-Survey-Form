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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        <button
          onClick={createSurvey}
          className="flex w-40 h-48 md:h-60 md:w-52 items-center font-bold bg-gray-200 hover:bg-themeColor rounded-lg "
        >
          <div className="text-center md:px-6 md:py-6 font-xs md:font-bold text-gray-500 place-items-center hover:text-white">
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

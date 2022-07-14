import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { surveyApi } from "../apis";
import { SurveyType } from "../types";
import { MySurveyCard } from "./MySurvey";

const testData = [
  { id: 0, name: "이름1", description: "설명1" },
  { id: 1, name: "이름2", description: "설명2" },
  { id: 2, name: "이름3", description: "설명3" },
];
export const Profile = () => {
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<SurveyType>({
    user: {},
    title: "",
    comment: "",
    questions: [],
  });
  const [cardDatas, setCardDatas] = useState<SurveyType[]>([]);

  useEffect(() => {
    getSurveys();
  }, [cardDatas]);
  async function createSurvey() {
    const newSurvey: SurveyType = await surveyApi.createSurvey(survey);
    navigate(`/surveys/edit/${newSurvey._id}`, {
      replace: true,
    });
  }

  async function getSurveys() {
    const surveys: SurveyType[] = await surveyApi.getSurveys();
    setCardDatas(surveys);
  }
  // let surveys = getSurvey(_id);

  return (
    <div className="flex flex-col items-center">
      <div className="m-5">나의 설문조사</div>
      <div className="flex space-x-4 mt-5">
        <button
          onClick={createSurvey}
          className="flex h-60 w-48 items-center border-2 border-themeColor font-bold bg-gray-200 hover:bg-themeColor rounded-lg "
        >
          <div className="text-center px-6 py-6 font-bold text-gray-500 place-items-center hover:text-white">
            CREATE NEW SURVEY!
          </div>
        </button>
        {cardDatas.map((data, i) => {
          return <MySurveyCard data={data} key={i} />;
        })}
      </div>
    </div>
  );
};

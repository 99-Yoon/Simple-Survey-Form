import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { surveyApi } from "../apis";
import { SurveyType } from "../types";
import { catchErrors } from "../helpers";

type Props = {
  data: SurveyType;
};

export const MySurveyCard = ({ data }: Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const editSurvey = () => {
    navigate(`/surveys/edit/${data._id}`, {
      replace: true,
    });
  };

  const goSurvey = () => {
    navigate(`/surveys/${data._id}`, {
      replace: true,
    });
  };

  async function deleteSurvey() {
    try {
      if (data._id) {
        const survey = await surveyApi.deleteSurvey(data._id);
        setSuccess(true);
        setError("");
        location.reload();
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.log("에러발생");
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-52 h-60 rounded border-2">
      <div className="h-32 p-5">
        <p className="text-gray-700">
          {data.comment ? data.comment : "설명없는 설문조사"}
        </p>
      </div>
      <div className="flex flex-col px-5 py-3">
        <div className="h-12">
          <button type="button" onClick={goSurvey}>
            <p className="font-bold">
              {data.title ? data.title : "제목없는 설문조사"}
            </p>
          </button>
          <p className="text-gray-500 text-sm">
            {data.updatedAt?.substring(0, 10)}
          </p>
        </div>
        <div className="flex justify-end pt-1">
          <button
            type="button"
            className="bg-themeColor rounded text-white py-1 px-1.5 mr-1"
            onClick={editSurvey}
          >
            수정
          </button>
          <button
            type="button"
            className="bg-themeColor rounded text-white py-1 px-1.5 ml-1"
            onClick={deleteSurvey}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

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
    navigate(`/surveys/${data._id}/edit`, {
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
    <div className="w-52 h-60 rounded border-2 hover:border-2 hover:border-themeColor">
      <button className="w-full" onClick={editSurvey}>
        <div className="h-36 p-5">
          <p className="text-gray-700">
            {data.comment ? data.comment : "설명없는 설문조사"}
          </p>
        </div>

        <div className="flex flex-col h-12 place-items-center">
          <p className="font-bold">
            {data.title ? data.title : "제목없는 설문조사"}
          </p>

          <p className="text-gray-500 text-sm">
            {data.updatedAt?.substring(0, 10)}
          </p>
        </div>
      </button>
      <div className="flex justify-end pt-1">
        <button
          type="button"
          className="bg-themeColor rounded text-white py-1 px-1.5 ml-1"
          onClick={deleteSurvey}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

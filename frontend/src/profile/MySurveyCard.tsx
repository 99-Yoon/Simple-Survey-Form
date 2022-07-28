import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { surveyApi } from "../apis";
import { SurveyType } from "../types";
import { catchErrors } from "../helpers";
import { DuplicateIcon } from "../icons";

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
      state: { save: true },
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`http://localhost:8080/survey/${data._id}`);
    alert("설문조사의 링크가 클립보드에 저장되었습니다.");
  };

  async function deleteSurvey() {
    if (window.confirm("해당 설문조사를 삭제하시겠습니까?")) {
      try {
        if (data._id) {
          const survey = await surveyApi.deleteSurvey(data._id);
          setSuccess(true);
          setError("");
          alert("삭제되었습니다.");
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
  }

  return (
    <div className="w-40 h-48 md:w-52 md:h-60 rounded border-2 hover:border-2 hover:border-themeColor">
      <button className="w-full pt-1" onClick={editSurvey}>
        <p className="font-bold">
          {data.title ? data.title : "제목없는 설문조사"}
        </p>

        <div className="h-24 md:h-36 p-3 overflow-y-hidden hover:overflow-y-auto">
          <p className="text-gray-700 text-justify">
            {data.comment ? data.comment : "설명없는 설문조사"}
          </p>
        </div>
        <p className="text-gray-500 text-sm">
          {data.updatedAt?.substring(0, 10)}
        </p>
      </button>
      <div className="flex justify-end pt-1 pr-1">
        <button className="flex place-self-center" onClick={copyLink}>
          링크복사
          <DuplicateIcon className="w-7 h-7" />
        </button>
        <button
          type="button"
          className="bg-themeColor rounded text-white py-1 px-1.5 ml-1 mr-1.5"
          onClick={deleteSurvey}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

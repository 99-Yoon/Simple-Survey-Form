import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export const EditResponseButton = () => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const navigate = useNavigate();

  function editButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    navigate(`/surveys/edit/${surveyId}`);
  }
  return (
    <div>
      <div className="flex place-content-center">
        <button
          className="text-xl m-3 underline decoration-4"
          onClick={editButtonClick}
        >
          설문지 수정
        </button>
        <button
          className="text-xl m-3 underline"
          /*onClick={}*/
        >
          응답결과
        </button>
      </div>
      <Outlet />
    </div>
  );
};

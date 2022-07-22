import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export const EditResultButton = () => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const navigate = useNavigate();

  /*function editButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    navigate(`/surveys/${surveyId}/edit`);
  }
  function resultButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    navigate(`/surveys/${surveyId}/result`);
  }*/

  return (
    <div>
      <div className="flex place-content-center">
        <NavLink
          to={`/surveys/${surveyId}/edit`}
          style={({ isActive }) =>
            isActive ? { color: "#58ACFA" } : { color: "black" }
          }
        >
          <div className="text-xl m-3 underline">설문지 수정</div>
        </NavLink>
        <NavLink
          to={`/surveys/${surveyId}/result`}
          style={({ isActive }) =>
            isActive ? { color: "#58ACFA" } : { color: "black" }
          }
        >
          <div className="text-xl m-3 underline">응답결과</div>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

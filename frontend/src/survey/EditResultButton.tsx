import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export const EditResultButton = () => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex place-content-center mt-6">
        <NavLink
          to={`/surveys/${surveyId}/edit`}
          style={({ isActive }) =>
            isActive
              ? {
                  color: "white",
                  backgroundColor: "#58ACFA",
                }
              : {
                  borderBottomWidth: "1px",
                  borderColor: "#58ACFA",
                }
          }
        >
          <div className="text-xl m-3 ">설문지 수정</div>
        </NavLink>
        <NavLink
          to={`/surveys/${surveyId}/result`}
          style={({ isActive }) =>
            isActive
              ? {
                  color: "white",
                  backgroundColor: "#58ACFA",
                }
              : {
                  borderBottomWidth: "1px",
                  borderColor: "#58ACFA",
                }
          }
        >
          <div className="text-xl m-3">응답결과</div>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

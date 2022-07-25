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
                  width: "140px",
                  color: "white",
                  backgroundColor: "#58ACFA",
                  borderTopLeftRadius: "25px",
                  borderBottomLeftRadius: "25px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                }
              : {
                  width: "140px",
                  borderWidth: "1px",
                  borderColor: "#58ACFA",
                  borderTopLeftRadius: "25px",
                  borderBottomLeftRadius: "25px",
                  textAlign: "center",
                  fontSize: "18px",
                }
          }
        >
          <div className="m-3 ">설문지 수정</div>
        </NavLink>
        <NavLink
          to={`/surveys/${surveyId}/result`}
          style={({ isActive }) =>
            isActive
              ? {
                  width: "140px",
                  color: "white",
                  backgroundColor: "#58ACFA",
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                }
              : {
                  width: "140px",
                  borderWidth: "1px",
                  borderColor: "#58ACFA",
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                  textAlign: "center",
                  fontSize: "18px",
                }
          }
        >
          <div className="m-3">응답결과</div>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

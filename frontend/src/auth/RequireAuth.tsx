import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth.context";

export const RequireAuth: FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user.isLoggedIn) {
    alert("로그인이 필요합니다.");
    return (
      <Navigate to={"/login"} state={{ from: location.pathname }} replace />
    );
  }
  return children;
};

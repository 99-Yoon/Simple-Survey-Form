import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth.context";

export const RequireAuth: FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user.isLoggedIn) {
    return (
      <Navigate to={"/login"} state={{ from: location.pathname }} replace />
    );
  }
  return children;
};

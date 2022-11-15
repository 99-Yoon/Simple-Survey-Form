import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAxiosInterceptor } from "../apis";
import { AuthProvider } from "../auth";
import { Header } from "../commons";

export const BaseLayout = () => {
  const navigate = useNavigate();
  useAxiosInterceptor(navigate);

  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
};

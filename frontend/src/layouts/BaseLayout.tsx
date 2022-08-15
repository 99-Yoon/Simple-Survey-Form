import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../auth";
import { Header } from "../commons";

export const BaseLayout = () => {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
};

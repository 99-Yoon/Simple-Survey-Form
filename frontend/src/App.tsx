import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./auth/auth.context";
import { Header } from "./commons";

const App = () => (
  <AuthProvider>
    <Header />
    <Outlet />
  </AuthProvider>
);

export default App;

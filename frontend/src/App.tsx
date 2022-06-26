import React from "react";
import RootPage from "./Pages/RootPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import CreateSurveyFormPage from "./Pages/CreateSurveyFormPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "tailwindcss/tailwind.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route index element={<HomePage/>}/>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="create" element={<CreateSurveyFormPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

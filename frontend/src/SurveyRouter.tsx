import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { Login, SignUp } from "./auth";
import { CreateSurveyForm, SurveyForm } from "./commons";
import { Home } from "./home";

export const SurveyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="create" element={<CreateSurveyForm />} />
          <Route path="survey" element={<SurveyForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { Login, SignUp } from "./auth";
import { RequireAuth } from "./auth/RequireAuth";
import { AnswerSurveyForm } from "./answers";
import { Home } from "./home";
import { Profile } from "./profile";
import { EditResultButton } from "./survey";
import { EditSurvey } from "./survey/EditSurvey";
import { ResultSurvey } from "./survey/ResultSurvey";
import { CompleteSurvey } from "./survey/CompleteSurvey";
import { SameSurvey } from "./survey/SameSurvey";
import { CreateSurvey } from "./survey/CreateSurvey";

export const SurveyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="surveys/:surveyId/create" element={<CreateSurvey />} />
          <Route path="surveys/:surveyId/" element={<EditResultButton />}>
            <Route path="edit" element={<EditSurvey />} />
            <Route path="result" element={<ResultSurvey />} />
          </Route>
          <Route path="survey/:surveyId" element={<AnswerSurveyForm />} />
          <Route path="survey/complete" element={<CompleteSurvey />} />
          <Route path="survey/same" element={<SameSurvey />} />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

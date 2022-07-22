import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { Login, SignUp } from "./auth";
import { RequireAuth } from "./auth/RequireAuth";
import { SurveyForm } from "./commons";
import { Home } from "./home";
import { Profile } from "./profile";
import { EditResponseButton } from "./survey";
import { EditSurvey } from "./survey/EditSurvey";

export const SurveyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="surveys/edit/" element={<EditResponseButton />}>
            <Route path=":surveyId" element={<EditSurvey />} />
            <Route path=":surveyId/response" element />
          </Route>
          <Route path="surveys/:surveyId" element={<SurveyForm />} />
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

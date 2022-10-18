import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, SignUp, RequireAuth } from "./auth";
import { NotFound } from "./commons";
import {
  CreateSurvey,
  EditSurvey,
  AnswerSurvey,
  ResultSurvey,
  SurveysList,
  AnswerPreview,
} from "./surveys";
import {
  AnswerLayout,
  BaseLayout,
  SurveyLayout,
  SurveysLayout,
  ResultLayout,
} from "./layouts";
import { Home } from "./home";
import { OAuthRedirectHandler } from "./auth/OAuthRedirectHandler";
import { LoginSuccess } from "./commons/LoginSuccess";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/login/success" element={<LoginSuccess />} />
          <Route path="/oauth/kakao" element={<OAuthRedirectHandler />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ResultLayout />}>
            <Route path="/results/:surveyId" element={<ResultSurvey />} />
          </Route>

          <Route element={<AnswerLayout />}>
            <Route path="/answers/:surveyId" element={<AnswerSurvey />} />
          </Route>
          <Route
            path="/surveys"
            element={
              <RequireAuth>
                <SurveysLayout />
              </RequireAuth>
            }
          >
            <Route index element={<SurveysList />} />
            <Route path="create" element={<CreateSurvey />} />
            <Route path=":surveyId" element={<SurveyLayout />}>
              <Route index element={<AnswerPreview />} />
              <Route path="edit" element={<EditSurvey />} />
              <Route path="result" element={<ResultSurvey />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, SignUp, RequireAuth } from "./auth";
import { NotFound } from "./commons";
import {
  Profile,
  CreateSurvey,
  Preview,
  EditSurvey,
  AnswerSurvey,
  ResultSurvey,
} from "./surveys";
import {
  AnswerLayout,
  BaseLayout,
  ModifyLayout,
  ResultLayout,
} from "./layouts";
import { Home } from "./home";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
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
                <ModifyLayout />
              </RequireAuth>
            }
          >
            <Route path="create" element={<CreateSurvey />} />
            <Route path="profile" element={<Profile />} />
            <Route path=":surveyId" element={<Preview />} />
            <Route path=":surveyId/edit" element={<EditSurvey />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

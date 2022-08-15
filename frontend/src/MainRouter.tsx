import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, SignUp } from "./auth";
import { NotFound } from "./commons";
import {
  Profile,
  CreateSurvey,
  Preview,
  EditSurvey,
  AnswerSurvey,
} from "./surveys";
import { AnswerLayout, BaseLayout, ModifyLayout } from "./layouts";
import { Home } from "./home";
import { RequireAuth } from "./auth/RequireAuth";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
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

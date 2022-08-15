import React from "react";
import "tailwindcss/tailwind.css";
import { createRoot } from "react-dom/client";
import { SurveyRouter } from "./SurveyRouter";
import { MainRouter } from "./MainRouter";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    {/* <SurveyRouter /> */}
    <MainRouter />
  </React.StrictMode>
);

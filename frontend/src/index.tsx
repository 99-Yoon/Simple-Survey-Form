import React from "react";
import "tailwindcss/tailwind.css";
import { createRoot } from "react-dom/client";
import { SurveyRouter } from "./SurveyRouter";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <SurveyRouter />
  </React.StrictMode>
);

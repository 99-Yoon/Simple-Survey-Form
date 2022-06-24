import React from "react";
import HomePage from "./Pages/HomePage";
// import LoginPage from "./Pages/LoginPage";
// import SignUpPage from "./Pages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "tailwindcss/tailwind.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          {/* <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./commons";

const App = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

export default App;

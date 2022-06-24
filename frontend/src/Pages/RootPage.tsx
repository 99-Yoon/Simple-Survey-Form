import React from "react";
import Header from "../Components/Header";
import "tailwindcss/tailwind.css";
import { Outlet } from "react-router-dom";

const RootPage = () => (
    <div>
        <Header />
        <Outlet />
    </div>
);

export default RootPage;
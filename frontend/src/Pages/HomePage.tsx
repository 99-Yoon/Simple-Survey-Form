import React from "react";
import Header from "../Components/Header";
import "tailwindcss/tailwind.css";
import { Outlet } from "react-router-dom";

type HomeProps = {

};

const HomePage = ({}: HomeProps) => (
    <div className="">
        <Header/>
        <Outlet />
    </div>
); 
 
export default HomePage;
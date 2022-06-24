import React from "react";
import "tailwindcss/tailwind.css";

type HomeProps = {
    title?: string;
};

const HomePage = ({ title = "Simple Survey Form" }: HomeProps) => (
    <div className="text-slate-300 text-3xl font-bold">
        {title}
    </div>
); 
 
export default HomePage;
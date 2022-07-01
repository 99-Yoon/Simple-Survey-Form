import React from "react";
import { Link } from "react-router-dom";

type HomeProps = {
  title?: string;
};

export const Home = ({ title = "Simple Survey Form" }: HomeProps) => (
  
    <div className="flex flex-col place-items-center">
      <div className="justify-end text-center text-3xl text-black h-16 mt-12">
        가장 쉽게 설문지를 만드세요!
      </div>
      <div className="flex flex-col place-items-center container">
        <div>
          <Link to="/create" className="flex h-14 w-28 items-center border-2 border-themeColor font-bold text-black bg-gray-200 hover:bg-themeColor rounded-lg ">
            <div className="text-center w-28 font-bold text-black place-items-center">+</div>
          </Link>
        </div>
        <p className="text-center text-xl text-black">
          Create now!
        </p>
      </div>
      <div className="flex justify-center">
        <img src="https://3hbgf23vu0wr11wkpae5igwe-wpengine.netdna-ssl.com/wp-content/uploads/2021/04/SurveyExample_v3.jpg"
          className="object-scale-down justify-center"
        />

      </div>
    </div>
  
);

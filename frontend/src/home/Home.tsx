import React from "react";

type HomeProps = {
  title?: string;
};

export const Home = ({ title = "Simple Survey Form" }: HomeProps) => (
  <div>
    <div className="text-center text-3xl text-black my-5">
      가장 쉽게 설문지를 만드세요!
    </div>
    <div className="flex container justify-center my-6">
      <div className="flex justify-center text-2xl font-bold h-14 w-28 border-blue-500 rounded-lg bg-gray-300">
        <div className="flex">
          <button className="text-black">+</button>
        </div>
      </div>
    </div>
    <div className="text-center text-xl text-black">Create now</div>
  </div>
);

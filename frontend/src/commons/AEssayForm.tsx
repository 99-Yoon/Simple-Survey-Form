import React from "react";

export const AEssayForm = () => {
  return (
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-3">
      <div className="flex flexgi-row h-16 w-full place-content-between items-center">
        <form className="text-xl font-bold ml-6 w-1/2">input</form>
      </div>
      <form className="border w-11/12 my-3">설문조사 설명</form>
      <input className="border w-11/12 h-36 my-3" type="text"></input>
    </div>
  );
};

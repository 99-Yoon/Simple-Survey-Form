import React from "react";

export const ADropdownForm = () => {
  return (
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-3">
      <div className="flex flexgi-row h-16 w-full items-center">
        <form className="text-xl font-bold ml-6 w-1/2">dropdown</form>
      </div>
      <form className="border w-11/12 my-3">설문조사 설명</form>
      <select className="py-2 hover:bg-themeColor bg-gray-200 rounded ">
        <option selected>choose answer</option>
        <option>first</option>
        <option>second</option>
      </select>
    </div>
  );
};

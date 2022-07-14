import React from "react";
import { RadioType } from "../types";

// type Props = {
//   element: RadioType;
// };

export const ARadioForm = () => {
  return (
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-3">
      <div className="flex flexgi-row h-16 w-full place-content-between items-center">
        <form className="text-xl font-bold ml-6 w-1/2">radio</form>
      </div>
      <form className="border w-11/12 my-4">설문조사 설명</form>
      <div className="flex flex-row items-center m-3">
        <div className="flex items-center mb-4 mx-4">
          <input
            id="default-radio-1"
            type="radio"
            value=""
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="ml-2 text-lg">First radio</label>
        </div>
        <div className="flex items-center mb-4 mx-4">
          <input
            id="default-radio-1"
            type="radio"
            value=""
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="ml-2 text-lg">Second radio</label>
        </div>
        <div className="flex items-center mb-4 mx-4">
          <input
            checked
            id="default-radio-2"
            type="radio"
            value=""
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="ml-2 text-lg">Checked state</label>
        </div>
      </div>
    </div>
  );
};

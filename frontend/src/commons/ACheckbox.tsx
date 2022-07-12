import React from "react";

export const ACheckboxForm = () => {
  return (
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-3">
      <div className="flex flexgi-row h-16 w-full place-content-between items-center">
        <form className="text-xl font-bold ml-6 w-1/2">checkbox</form>
      </div>
      <form className="border w-11/12 my-4">설문조사 설명</form>
      <div className="flex flex-row items-center m-3">
        <div className="mb-4 mx-3">
          <input
            id="default-checkbox"
            type="checkbox"
            className="w-5 h-5 mt-3 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <input className="ml-2 text-lg font-medium">First checkbox</input>
        </div>
        <div className="mb-4 mx-3">
          <input
            id="default-checkbox"
            type="checkbox"
            className="w-5 h-5 mt-3 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="ml-2 text-lg font-medium">Second checkbox</label>
        </div>
        <div className="mb-4 mx-3">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            className="w-5 h-5 mt-3 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="ml-2 text-lg font-medium">Third checkbox</label>
        </div>
        <div className="mb-4 mx-4">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            className="w-5 h-5 mt-3 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="ml-2 text-lg font-medium">Fourth checkbox</label>
        </div>
      </div>
    </div>
  );
};

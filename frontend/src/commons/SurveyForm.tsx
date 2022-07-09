import React, { InputHTMLAttributes } from "react";

export const SurveyForm = () => {
  return (
    <div className="flex flex-col place-items-center">
      <div className="flex flex-col container place-items-center mt-4">
        <form className="font-bold text-4xl text-center m-2">설문지 제목</form>
        <textarea
          className="font-bold text-1xl text-center m-2 resize-none"
          placeholder="설문조사에 대한 설명을 입력해주세요"
          rows={2}
          cols={60}
        ></textarea>
        <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-3">
          <div className="flex flexgi-row h-16 w-full place-content-between items-center">
            <form className="text-xl font-bold ml-6 w-1/2">
              Q1. 첫번째 질문
            </form>
          </div>
          <form className="border w-11/12 my-3">설문조사 설명</form>
          <input
            className="border w-11/12 h-36 my-3"
            type="text"
            placeholder="설문조사 답변"
          ></input>
        </div>
        <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-3">
          <div className="flex flexgi-row h-16 w-full place-content-between items-center">
            <form className="text-xl font-bold ml-6 w-1/2">
              Q2. 두번째 질문
            </form>
          </div>
          <form className="border w-11/12 my-4">설문조사 설명</form>
          <div className="flex flex-row items-center m-3">
            <div className="mb-4 mx-3">
              <input
                id="default-checkbox"
                type="checkbox"
                className="w-5 h-5 mt-3 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ml-2 text-lg font-medium">First checkbox</label>
            </div>
            <div className="mb-4 mx-3">
              <input
                id="default-checkbox"
                type="checkbox"
                className="w-5 h-5 mt-3 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ml-2 text-lg font-medium">
                Second checkbox
              </label>
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
              <label className="ml-2 text-lg font-medium">
                Fourth checkbox
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-3">
          <div className="flex flexgi-row h-16 w-full place-content-between items-center">
            <form className="text-xl font-bold ml-6 w-1/2">
              Q3. 세번째 질문
            </form>
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
      </div>
      <div>
        <button className="rounded bg-themeColor my-5 py-2 px-5 font-bold text-white">
          제출하기
        </button>
      </div>
    </div>
  );
};

import React from "react";

export const SurveyForm = () => (
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
          <form className="text-xl font-bold ml-6 w-1/2">Q1. 첫번째 질문</form>
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
          <form className="text-xl font-bold ml-6 w-1/2">Q1. 첫번째 질문</form>
        </div>
        <form className="border w-11/12 my-4">설문조사 설명</form>
        <input
          className="border w-11/12 h-36 my-3"
          type="text"
          placeholder="설문조사 답변"
        ></input>
      </div>
    </div>
    <div>
      <button className="rounded bg-themeColor my-5 py-2 px-5 font-bold text-white">
        제출하기
      </button>
    </div>
  </div>
);

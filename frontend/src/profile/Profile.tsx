import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyType } from "../types";

export const Profile = () => {
  const navigate = useNavigate();
  // const [Ssurvey, setSsurvey] = useState<SurveyType>({
  //   title: "",
  //   comment: "",
  //   //questions 는 _id들의 배열
  //   questions: [],
  // });

  // function handleAnswer(event: React.ChangeEvent<HTMLInputElement>) {
  //   setSsurvey({
  //     ...survey,
  //     [event.currentTarget.name]: event.currentTarget.value,
  //   })
  // }

  const createSurvey = () => {
    // 먼저 서버에 survey 테이블에 새로운 survey 항목 추가 로직 필요
    navigate("/surveys/create", { replace: true });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="m-5">나의 설문조사</div>
      <div className="flex flex-row space-x-4 mt-5">
        <button
          onClick={createSurvey}
          className="flex h-60 w-48 items-center border-2 border-themeColor font-bold bg-gray-200 hover:bg-themeColor rounded-lg "
        >
          <div className="text-center px-6 py-6 font-bold text-gray-500 place-items-center hover:text-white">
            CREATE NEW SURVEY!
          </div>
        </button>
        <div className="w-48 h-60 rounded overflow-hidden border-2">
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className="flex flex-col py-6">
            <div className="px-2 py-2">
              <label>설문조사 이름</label>
            </div>
            <div className="flex justify-end dropdown-toggle">
              <select className="py-2 w-14 bg-themeColor rounded text-white">
                <option selected>옵션</option>
                <option>삭제</option>
                <option>이름 바꾸기</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-48 h-60 rounded overflow-hidden border-2">
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className="flex flex-col py-6">
            <div className="px-2 py-2">
              <label>설문조사이름</label>
            </div>
            <div className="flex justify-end dropdown-toggle">
              <select className="py-2 w-14 bg-themeColor rounded text-white">
                <option selected>옵션</option>
                <option>삭제</option>
                <option>이름 바꾸기</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-48 h-60 rounded overflow-hidden border-2">
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className="flex flex-col py-6">
            <div className="px-2 py-2">
              <label>설문조사 이름</label>
            </div>
            <div className="flex justify-end dropdown-toggle">
              <select className="py-2 w-14 bg-themeColor rounded text-white">
                <option selected>옵션</option>
                <option>삭제</option>
                <option>이름 바꾸기</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-48 h-60 rounded overflow-hidden border-2">
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className="flex flex-col py-6">
            <div className="px-2 py-2">
              <label>설문조사 이름</label>
            </div>
            <div className="flex justify-end dropdown-toggle">
              <select className="py-2 w-14 bg-themeColor rounded text-white">
                <option selected>옵션</option>
                <option>삭제</option>
                <option>이름 바꾸기</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

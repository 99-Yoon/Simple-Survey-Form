import React from "react";
import { Link } from "react-router-dom";

export const Profile = () => {
  return (
    <div className="flex justify-center">
      <div className="  m-5">나의 설문조사</div>
      <div className="flex flex-row space-x-4 mt-5">
        <Link
          to="/create"
          className="flex h-60 w-48 items-center border-2 border-themeColor font-bold bg-gray-200 hover:bg-themeColor rounded-lg "
        >
          <div className="text-center px-6 py-6 font-bold text-gray-500 place-items-center hover:text-white">
            CREATE NEW SURVEY!
          </div>
        </Link>
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

import React, { useState } from "react";
import { FileType } from "../types";
// import { useQuestion } from "./question.context";
// import { TypeChange } from "./typeDD";

type Props = {
  element: FileType;
};

export const QFile = ({ element }: Props) => {
  //   const { questionListChange } = useQuestion();

  return (
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-2">
      <div className="flex h-16 w-full place-content-between items-center">
        <input
          type="text"
          name="title"
          id={element._id}
          className="text-xl font-bold ml-6 border-b-2 w-1/2"
          placeholder={element.title}
          //   onChange={questionListChange}
        ></input>
        {/* <TypeChange tt="file" /> */}
      </div>
      <div className="flex w-full justify-center">
        <input
          type="text"
          name="comment"
          id={element._id}
          className="border w-11/12"
          placeholder="질문에 대한 설명을 입력해주세요"
          //   onChange={questionListChange}
        ></input>
      </div>
      <div id="commentarea" className="flex mt-4 w-full justify-center">
        <input type="file" className=" w-11/12 h-16" disabled></input>
      </div>
      <div className="flex w-full justify-end py-2">
        <button className="w-1/12">필수</button>
        <button className="w-1/12">옵션</button>
        <button className="w-1/12">삭제</button>
      </div>
    </div>
  );
};

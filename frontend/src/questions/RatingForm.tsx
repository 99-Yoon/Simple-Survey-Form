import React from "react";
import { RatingType } from "../types";
// import { useQuestion } from "./question.context";
// import { TypeChange } from "./typeDD";

type Props = {
  element: RatingType;
  //   deleteValue: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const QRating = ({ element }: Props) => {
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
        {/* <TypeChange tt="rating" /> */}
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
      <div className="flex place-content-between items-center p-5">
        <input
          name="minRateDescription"
          id={element._id}
          className="border-b-2 text-center"
          size={10}
          placeholder={element.content.minRateDescription}
        ></input>
        {element.content.choices.map((e) => (
          <input
            name="text"
            id={element._id}
            type="text"
            className="border border-black rounded-full py-1 m-2 text-center"
            size={1}
            placeholder={e.text}
          ></input>
        ))}
        <input
          name="maxRateDescription"
          id={element._id}
          className="border-b-2 text-center"
          size={10}
          placeholder={element.content.maxRateDescription}
        ></input>
      </div>
      <div>
        <button
          //   type="button"
          name="rateValues"
          id={element._id}
          className="border border-red-500 rounded mx-2 px-2"
          //   onClick={deleteValue}
        >
          삭제
        </button>
        <button className="border border-blue-500 rounded mx-2 px-2">
          추가
        </button>
      </div>
      <div className="flex w-full justify-end py-2">
        <button className="w-1/12">필수</button>
        <button className="w-1/12">옵션</button>
        <button className="w-1/12">삭제</button>
      </div>
    </div>
  );
};

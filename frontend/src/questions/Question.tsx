import React, { useState, Dispatch, SetStateAction } from "react";
import { BasicQuestionType, EssayType } from "../types";
import { questionApi } from "../apis";
import { EssayForm } from "./EssayForm";
import { CheckboxForm } from "./CheckboxForm";
import { RadioForm } from "./RadioForm";
import { DropdownForm } from "./DropdownForm";
import { FileForm } from "./FileForm";
import { RatingForm } from "./RatingForm";

type Props = {
  element: BasicQuestionType;
  handleQuestion: (id: string) => void;
  deleteQuestion: (id: string) => void;
  changeCurrentId: (id: string) => void;
  currentId: string;
};

const typeDropDown = new Map([
  ["essay", "주관식"],
  ["radio", "객관식"],
  ["dropdown", "드롭다운"],
  ["checkbox", "체크박스"],
  ["file", "파일"],
  ["rating", "선형"],
  ["grid", "그리드"],
  ["date", "날짜"],
]);

export const Question = ({
  element,
  handleQuestion,
  deleteQuestion,
  changeCurrentId,
  currentId,
}: Props) => {
  const handleEdit = () => {
    //setCurrentId해주고 currentId===element._id가 같은 input들만 disabled=false
    changeCurrentId(element._id);
  };
  async function handleComplete() {
    //db에서 element._id인 애를 findOneAndUpdate() 해준다.
    try {
      const newQuestion: BasicQuestionType = await questionApi.updateQuestion(
        element
      );
      console.log(newQuestion);
      // setSuccess(true);
      // setError("");
    } catch (error) {
      console.log("에러발생");
      // catchErrors(error, setError)
    } finally {
      // setLoading(false);
    }
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedType = event.currentTarget.value;
    console.log(selectedType);
    if (
      selectedType === "radio" ||
      selectedType === "dropdown" ||
      selectedType === "checkbox"
    ) {
      element.content = {
        choices: [
          { text: "선택지1", value: "1" },
          { text: "선택지2", value: "2" },
          { text: "선택지3", value: "3" },
        ],
      };
    } else if (selectedType === "essay") {
      element.content = { choices: [] };
    } else if (selectedType === "rating") {
      element.content = {
        minRateDescription: "가장 낮음",
        maxRateDescription: "가장 높음",
        choices: [
          { text: "1", value: "1" },
          { text: "2", value: "2" },
          { text: "3", value: "3" },
        ],
      };
    }
    element.type = selectedType;
    handleQuestion(element._id);
  }

  function handleQuestionInfo(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    element[name] = value;
    handleQuestion(element._id);
  }

  function handleDelete() {
    deleteQuestion(element._id);
  }

  function getContent(element: BasicQuestionType) {
    switch (element.type) {
      case "essay":
        return <EssayForm element={element} />;
      case "radio":
        return <RadioForm handleQuestion={handleQuestion} element={element} />;
      case "checkbox":
        return (
          <CheckboxForm handleQuestion={handleQuestion} element={element} />
        );
      case "dropdown":
        return (
          <DropdownForm handleQuestion={handleQuestion} element={element} />
        );
      case "file":
        return <FileForm element={element} />;
      case "rating":
        return <RatingForm handleQuestion={handleQuestion} element={element} />;
      default:
        return <></>;
    }
  }

  return (
    <div className="flex flex-col container w-4/5 h-auto border-2 border-themeColor items-center m-3 py-2">
      <div className="flex h-16 w-full place-content-between items-center">
        <input
          type="text"
          name="title"
          id={element._id}
          className="text-xl font-bold ml-6 border-b-2 w-1/2"
          placeholder={"Question Title"}
          value={element.title}
          onChange={handleQuestionInfo}
        ></input>
        <select
          id={element._id}
          name="type"
          onChange={handleSelect}
          className="w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor w-full mr-3 p-2.5"
        >
          {Array.from(typeDropDown.entries()).map(([key, value]) => (
            <option
              id={element._id}
              value={key}
              selected={key === element.type}
            >
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full justify-center">
        <input
          type="text"
          name="comment"
          id={element._id}
          className="border w-11/12"
          placeholder="질문에 대한 설명을 입력해주세요"
          value={element.comment}
          onChange={handleQuestionInfo}
        ></input>
      </div>
      {getContent(element)}

      <div className="place-self-end py-2">
        <button type="button" className="px-1">
          필수
        </button>
        <button type="button" className="px-1">
          옵션
        </button>
        <button type="button" className="px-1" onClick={handleDelete}>
          삭제
        </button>
        {currentId === element._id ? (
          <button type="button" className="px-1" onClick={handleComplete}>
            수정완료
          </button>
        ) : (
          <button type="button" className="px-1" onClick={handleEdit}>
            수정하기
          </button>
        )}
      </div>
    </div>
  );
};

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
  const handleEditClick = () => {
    changeCurrentId(element._id);
  };
  async function handleEditComplete() {
    try {
      const newQuestion: BasicQuestionType = await questionApi.updateQuestion(
        element
      );
      console.log(newQuestion);
      changeCurrentId("");
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
          { text: "", value: 0 },
          { text: "", value: 1 },
          { text: "", value: 2 },
        ],
      };
    } else if (selectedType === "essay") {
      element.content = { choices: [] };
    } else if (selectedType === "rating") {
      element.content = {
        minRateDescription: "",
        maxRateDescription: "",
        choices: [
          { text: "", value: 0 },
          { text: "", value: 1 },
          { text: "", value: 2 },
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
        return <EssayForm element={element} currentId={currentId} />;
      case "radio":
        return (
          <RadioForm
            handleQuestion={handleQuestion}
            element={element}
            currentId={currentId}
          />
        );
      case "checkbox":
        return (
          <CheckboxForm
            handleQuestion={handleQuestion}
            element={element}
            currentId={currentId}
          />
        );
      case "dropdown":
        return (
          <DropdownForm
            handleQuestion={handleQuestion}
            element={element}
            currentId={currentId}
          />
        );
      case "file":
        return <FileForm element={element} currentId={currentId} />;
      case "rating":
        return (
          <RatingForm
            handleQuestion={handleQuestion}
            element={element}
            currentId={currentId}
          />
        );
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
          disabled={currentId !== element._id}
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
          disabled={currentId !== element._id}
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
          <button type="button" className="px-1" onClick={handleEditComplete}>
            수정완료
          </button>
        ) : (
          <button type="button" className="px-1" onClick={handleEditClick}>
            수정하기
          </button>
        )}
      </div>
    </div>
  );
};

import React, { useState, Dispatch, SetStateAction } from "react";
import { BasicQuestionType, EssayType } from "../types";
import { questionApi } from "../apis";
import { EssayForm } from "./EssayForm";
import { CheckboxForm } from "./CheckboxForm";
import { RadioForm } from "./RadioForm";
import { DropdownForm } from "./DropdownForm";
import { FileForm } from "./FileForm";
import { RatingForm } from "./RatingForm";
import { DateForm } from "./DateForm";

type Props = {
  element: BasicQuestionType;
  handleQuestion: (id: string) => void;
  deleteQuestion: (id: string) => void;
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
}: Props) => {
  const [save, setSave] = useState(true);
  async function handleEditComplete() {
    try {
      const newQuestion: BasicQuestionType = await questionApi.updateQuestion(
        element
      );
      console.log(newQuestion);
      setSave(true);
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

  function getContent(element: BasicQuestionType) {
    switch (element.type) {
      case "essay":
        return <EssayForm element={element} save={save} />;
      case "radio":
        return (
          <RadioForm
            handleQuestion={handleQuestion}
            element={element}
            save={save}
          />
        );
      case "checkbox":
        return (
          <CheckboxForm
            handleQuestion={handleQuestion}
            element={element}
            save={save}
          />
        );
      case "dropdown":
        return (
          <DropdownForm
            handleQuestion={handleQuestion}
            element={element}
            save={save}
          />
        );
      case "file":
        return <FileForm element={element} save={save} />;
      case "rating":
        return (
          <RatingForm
            handleQuestion={handleQuestion}
            element={element}
            save={save}
          />
        );
      case "date":
        return <DateForm />;
      default:
        return <></>;
    }
  }
  const handleRequired = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.currentTarget;
    element[value] = checked;
    handleQuestion(element._id);
  };
  const handleDelete = () => {
    deleteQuestion(element._id);
  };
  const handleEditClick = () => {
    setSave(false);
  };
  return (
    <div
      style={{ borderColor: save ? "#58ACFA" : "red" }}
      className="flex flex-col container w-4/5 h-auto border-2 items-center m-3 py-2"
    >
      <div className="flex h-16 w-full place-content-between items-center">
        <input
          type="text"
          name="title"
          id={element._id}
          className="text-xl font-bold ml-6 border-b-2 w-1/2"
          placeholder={"Question Title"}
          value={element.title}
          onChange={handleQuestionInfo}
          disabled={save}
        ></input>
        <select
          id={element._id}
          name="type"
          onChange={handleSelect}
          disabled={save}
          className="w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor w-full mr-3 p-2.5"
        >
          {Array.from(typeDropDown.entries()).map(([key, value]) => (
            <option
              key={key}
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
          disabled={save}
        ></input>
      </div>
      {getContent(element)}

      <div className="place-self-end py-2">
        <input
          type="checkbox"
          id="isRequired"
          value="isRequired"
          onChange={handleRequired}
          disabled={save}
          checked={element.isRequired}
        />
        <label htmlFor="isRequired" className="px-1">
          필수
        </label>
        <button type="button" className="px-1" onClick={handleDelete}>
          삭제
        </button>
        {save ? (
          <button type="button" className="px-1" onClick={handleEditClick}>
            수정하기
          </button>
        ) : (
          <button type="button" className="px-1" onClick={handleEditComplete}>
            수정완료
          </button>
        )}
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { BasicQuestionType } from "../types";
import { questionApi } from "../apis";
import { EssayForm } from "./EssayForm";
import { CheckboxForm } from "./CheckboxForm";
import { RadioForm } from "./RadioForm";
import { DropdownForm } from "./DropdownForm";
import { FileForm } from "./FileForm";
import { RatingForm } from "./RatingForm";
import { DateForm } from "./DateForm";
import { QUESTION_TYPES } from "../commons";

type Props = {
  element: BasicQuestionType;
  isEditing: boolean;
  handleEditing: (qid: string, isEditing: boolean) => void;
  handleQuestion: (element: BasicQuestionType) => void;
  deleteQuestion: (id: string) => void;
};

export const Question = ({
  element,
  isEditing,
  handleEditing,
  handleQuestion,
  deleteQuestion,
}: Props) => {
  const [question, setQuestion] = useState({ ...element });
  // const [isEditing, setIsEditing] = useState(false);

  console.log("is editing in question:", isEditing);

  async function handleEditComplete() {
    try {
      console.log(question);
      const newQuestion: BasicQuestionType = await questionApi.updateQuestion(
        question
      );
      // console.log(newQuestion);
      handleQuestion(question);
      // setIsEditing(true);
      handleEditing(question._id, false);
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
    let content;
    if (
      selectedType === "radio" ||
      selectedType === "dropdown" ||
      selectedType === "checkbox"
    ) {
      content = {
        choices: [{ text: "", value: 0 }],
      };
    } else if (selectedType === "essay") {
      content = { choices: [] };
    } else if (selectedType === "rating") {
      content = {
        minRateDescription: "",
        maxRateDescription: "",
        choices: [{ text: "", value: 0 }],
      };
    }
    setQuestion({ ...question, type: selectedType, content: content });
  }

  const handleElement = () => {
    console.log("handle element");
    setQuestion({ ...question });
  };

  function handleQuestionInfo(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setQuestion({ ...question, [name]: value });
  }

  function getContent(element: BasicQuestionType) {
    switch (element.type) {
      case "essay":
        return <EssayForm element={element} isEditing={isEditing} />;
      case "radio":
        return (
          <RadioForm
            handleQuestion={handleElement}
            element={element}
            isEditing={isEditing}
          />
        );
      case "checkbox":
        return (
          <CheckboxForm
            handleQuestion={handleElement}
            element={element}
            isEditing={isEditing}
          />
        );
      case "dropdown":
        return (
          <DropdownForm
            handleQuestion={handleElement}
            element={element}
            isEditing={isEditing}
          />
        );
      case "file":
        return <FileForm element={element} isEditing={isEditing} />;
      case "rating":
        return (
          <RatingForm
            handleQuestion={handleElement}
            element={element}
            isEditing={isEditing}
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
    question[value] = checked;
    setQuestion({ ...question, [value]: checked });
  };

  const onCancel = () => {
    console.log("element canceled button clicked", element);
    console.log("question canceled button clicked", question);
    setQuestion(element);
    // setIsEditing(true);
    handleEditing(question._id, false);
  };

  const handleDelete = () => {
    if (window.confirm("질문을 삭제하시겠습니까?")) {
      deleteQuestion(element._id);
      alert("삭제되었습니다.");
    } else {
      alert("질문 삭제를 취소합니다.");
    }
  };

  const handleEditClick = () => {
    // setIsEditing(false);
    handleEditing(question._id, true);
  };

  return (
    <div
      style={{ borderColor: isEditing ? "red" : "#0A8A8A" }}
      className="flex flex-col container w-4/5 h-auto border-2 items-center m-3 py-2 rounded-lg"
    >
      <div className="flex h-16 w-full place-content-center items-center">
        <input
          type="text"
          name="title"
          id={question._id}
          className="text-xl font-bold border-b-2 w-11/12"
          placeholder={"Question Title"}
          value={question.title}
          onChange={handleQuestionInfo}
          disabled={!isEditing}
        ></input>
      </div>
      <div className="flex w-full justify-center">
        <input
          type="text"
          name="comment"
          id={question._id}
          className="border w-11/12"
          placeholder="질문에 대한 설명을 입력해주세요"
          value={question.comment}
          onChange={handleQuestionInfo}
          disabled={!isEditing}
        ></input>
      </div>
      {getContent(question)}
      <div className="flex flex-row place-content-between w-11/12 py-2">
        <select
          id={question._id}
          name="type"
          onChange={handleSelect}
          disabled={!isEditing}
          value={question.type}
          className="w-32 h-10 md:w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor"
        >
          {Array.from(QUESTION_TYPES.entries()).map(([key, value]) => (
            <option key={key} id={question._id} value={key}>
              {value}
            </option>
          ))}
        </select>
        <div className="place-self-end py-2">
          <input
            type="checkbox"
            id="isRequired"
            value="isRequired"
            onChange={handleRequired}
            disabled={!isEditing}
            checked={question.isRequired}
          />
          <label htmlFor="isRequired" className="px-1">
            필수
          </label>
          {isEditing ? (
            <>
              <button type="button" className="px-1" onClick={onCancel}>
                취소
              </button>

              <button
                type="button"
                className="px-1"
                onClick={handleEditComplete}
              >
                확인
              </button>
            </>
          ) : (
            <>
              <button type="button" className="px-1" onClick={handleDelete}>
                삭제
              </button>
              <button type="button" className="px-1" onClick={handleEditClick}>
                수정
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

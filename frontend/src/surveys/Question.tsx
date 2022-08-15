import React, { useState } from "react";
import { getEnumKeyByEnumValue, QUESTION_TYPES } from "../commons";
import { getElementByQuestionType } from "../helpers";
import { IQuestionProps } from "../types";

const options = Object.entries(QUESTION_TYPES).map(([type, value]) => (
  <option key={type} value={value}>
    {value}
  </option>
));

export const Question = ({
  element,
  handleQuestion,
  deleteQuestion,
}: IQuestionProps) => {
  const [question, setQuestion] = useState(element);
  const isEditing = question.isEditing;

  async function handleEditComplete() {
    question.isEditing = false;
    console.log("editing completed:", question);
    handleQuestion(question);
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedType = event.currentTarget.value;
    console.log(selectedType);

    const selectedKind =
      getEnumKeyByEnumValue(QUESTION_TYPES, selectedType) ?? "singletext";
    console.log("selected kind:", selectedKind);
    setQuestion({ ...question, type: selectedKind });
  }

  const handleElement = () => {
    console.log("handle element");
    setQuestion({ ...question });
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked, name, value } = event.currentTarget;
    if (name === "isRequired") {
      return setQuestion({ ...question, [name]: checked });
    }
    setQuestion({ ...question, [name]: value });
  }

  const onCancel = () => {
    const originalQuestion = { ...element, isEditing: false };
    setQuestion(originalQuestion);
    handleQuestion(originalQuestion);
  };

  const onDelete = () => {
    if (window.confirm("질문을 삭제하시겠습니까?")) {
      deleteQuestion(question._id);
    }
  };

  const onEdit = () => {
    setQuestion({ ...question, isEditing: true });
    handleQuestion({ ...question, isEditing: true });
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
          onChange={handleChange}
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
          onChange={handleChange}
          disabled={!isEditing}
        ></input>
      </div>
      {getElementByQuestionType(question, handleElement, isEditing)}
      <div className="flex flex-row place-content-between w-11/12 py-2">
        <select
          id={question._id}
          name="type"
          onChange={handleSelect}
          disabled={!isEditing}
          value={QUESTION_TYPES[question.type]}
          className="w-32 h-10 md:w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor"
        >
          {options}
        </select>
        <div className="place-self-end py-2">
          <input
            type="checkbox"
            id="isRequired"
            name="isRequired"
            onChange={handleChange}
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
              <button type="button" className="px-1" onClick={onDelete}>
                삭제
              </button>
              <button type="button" className="px-1" onClick={onEdit}>
                수정
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

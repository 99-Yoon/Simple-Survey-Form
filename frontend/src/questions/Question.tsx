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
  handleQuestion: (element: BasicQuestionType) => void;
  deleteQuestion: (id: string) => void;
  // isSave: boolean;
};

export const Question = ({
  element,
  handleQuestion,
  deleteQuestion,
}: // isSave,
Props) => {
  const [question, setQuestion] = useState({ ...element });
  const [isSaved, setIsSaved] = useState(false);

  async function handleEditComplete() {
    try {
      console.log(question);
      const newQuestion: BasicQuestionType = await questionApi.updateQuestion(
        question
      );
      // console.log(newQuestion);
      handleQuestion(question);
      setIsSaved(true);
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
    // question.type = selectedType;
    setQuestion({ ...question, type: selectedType, content: content });
    // handleQuestion(question._id);
  }

  const handleElement = () => {
    console.log("handle element");
    setQuestion({ ...question });
  };

  function handleQuestionInfo(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    // question[name] = value;
    setQuestion({ ...question, [name]: value });
    // handleQuestion(question._id);
  }

  function getContent(element: BasicQuestionType) {
    switch (element.type) {
      case "essay":
        return <EssayForm element={element} save={isSaved} />;
      case "radio":
        return (
          <RadioForm
            handleQuestion={handleElement}
            element={element}
            save={isSaved}
          />
        );
      case "checkbox":
        return (
          <CheckboxForm
            handleQuestion={handleElement}
            element={element}
            save={isSaved}
          />
        );
      case "dropdown":
        return (
          <DropdownForm
            handleQuestion={handleElement}
            element={element}
            save={isSaved}
          />
        );
      case "file":
        return <FileForm element={element} save={isSaved} />;
      case "rating":
        return (
          <RatingForm
            handleQuestion={handleElement}
            element={element}
            save={isSaved}
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
    // handleQuestion(question._id);
  };

  const onCancel = () => {
    console.log("element canceled button clicked", element);
    console.log("question canceled button clicked", question);
    setQuestion(element);
    setIsSaved(true);
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
    setIsSaved(false);
  };

  return (
    <div
      style={{ borderColor: isSaved ? "#0A8A8A" : "red" }}
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
          disabled={isSaved}
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
          disabled={isSaved}
        ></input>
      </div>
      {getContent(question)}

      <div className="flex flex-row place-content-between w-11/12 py-2">
        <select
          id={question._id}
          name="type"
          onChange={handleSelect}
          disabled={isSaved}
          value={question.type}
          className="w-32 h-10 md:w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor"
        >
          {Array.from(QUESTION_TYPES.entries()).map(([key, value]) => (
            <option key={key} id={question._id} value={key}>
              {value}
            </option>
          ))}
        </select>
        <div className="place-self-center">
          <input
            type="checkbox"
            id="isRequired"
            value="isRequired"
            onChange={handleRequired}
            disabled={isSaved}
            checked={question.isRequired}
          />
          <label htmlFor="isRequired" className="px-1">
            필수
          </label>
          {isSaved ? (
            <>
              <button type="button" className="px-1" onClick={handleDelete}>
                삭제
              </button>
              <button type="button" className="px-1" onClick={handleEditClick}>
                수정
              </button>
            </>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

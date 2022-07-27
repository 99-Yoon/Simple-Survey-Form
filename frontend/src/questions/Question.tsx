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
        element
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
        choices: [
          { text: "", value: 0 },
          { text: "", value: 1 },
          { text: "", value: 2 },
        ],
      };
    } else if (selectedType === "essay") {
      content = { choices: [] };
    } else if (selectedType === "rating") {
      content = {
        minRateDescription: "",
        maxRateDescription: "",
        choices: [
          { text: "", value: 0 },
          { text: "", value: 1 },
          { text: "", value: 2 },
        ],
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
    deleteQuestion(question._id);
  };

  const handleEditClick = () => {
    setIsSaved(false);
  };

  return (
    <div
      style={{ borderColor: isSaved ? "#58ACFA" : "red" }}
      className="flex flex-col container w-4/5 h-auto border-2 items-center m-3 py-2"
    >
      <div className="flex h-16 w-full place-content-between items-center">
        <input
          type="text"
          name="title"
          id={question._id}
          className="text-xl font-bold ml-6 border-b-2 w-1/2"
          placeholder={"Question Title"}
          value={question.title}
          onChange={handleQuestionInfo}
          disabled={isSaved}
        ></input>
        <select
          id={question._id}
          name="type"
          onChange={handleSelect}
          disabled={isSaved}
          value={question.type}
          className="w-32 md:w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor w-full mr-3 p-2.5"
        >
          {Array.from(QUESTION_TYPES.entries()).map(([key, value]) => (
            <option
              key={key}
              id={question._id}
              value={key}
              // selected={key === element.type}
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
          id={question._id}
          className="border w-11/12"
          placeholder="질문에 대한 설명을 입력해주세요"
          value={question.comment}
          onChange={handleQuestionInfo}
          disabled={isSaved}
        ></input>
      </div>
      {getContent(question)}

      <div className="place-self-end py-2">
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

            <button type="button" className="px-1" onClick={handleEditComplete}>
              확인
            </button>
          </>
        )}
      </div>
    </div>
  );
};

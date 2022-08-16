import React, { useState } from "react";
import { IQuestionFormProps } from "../types";

export const QDropdown = ({
  element,
  handleQuestion,
  isEditing,
}: IQuestionFormProps) => {
  const [choices, setChoices] = useState([...element.content.choices]);

  function handleContent(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    choices[+id].text = value;
    element.content.choices = choices;
    handleQuestion(element._id);
    console.log(choices);
  }
  function deleteValue() {
    //제일 마지막 index 제거
    choices.splice(-1, 1);
    element.content.choices = choices;
    handleQuestion(element._id);
  }
  function addValue() {
    choices.push({ text: "", value: choices.length });
    element.content.choices = choices;
    handleQuestion(element._id);
  }
  return (
    <>
      <div id="content" className="mt-4 p-5">
        <select className="mr-3">
          {choices.map((choice: any, index: number) => (
            <option key={choice.value}>{choice.text}</option>
          ))}
        </select>
        {choices.map((choice: any, index: number) => (
          <div key={choice.value} className="my-5">
            <input
              id={`${index}`}
              type="text"
              className="mx-2 border-b-2"
              placeholder="선택지"
              value={choice.text}
              onChange={handleContent}
              disabled={!isEditing}
            ></input>
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          name="rateValues"
          className="border border-red-500 rounded mx-2 px-2"
          onClick={deleteValue}
          disabled={!isEditing}
        >
          삭제
        </button>
        <button
          type="button"
          name="rateValues"
          className="border border-blue-500 rounded mx-2 px-2"
          onClick={addValue}
          disabled={!isEditing}
        >
          추가
        </button>
      </div>
    </>
  );
};

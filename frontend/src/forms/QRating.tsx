import React, { useState } from "react";
import { IQuestionFormProps } from "../types";

export const QRating = ({
  element,
  handleQuestion,
  isEditing,
}: IQuestionFormProps) => {
  const [choices, setChoices] = useState([...element.content.choices]);

  function handleContent(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value, name } = event.target;
    if (name === "text") {
      choices[+id].text = value;
      element.content.choices = choices;
    } else if (name === "minRateDescription") {
      element.content = { ...element.content, minRateDescription: value };
    } else if (name === "maxRateDescription") {
      element.content = { ...element.content, maxRateDescription: value };
    }
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
      <div className="flex place-content-center items-center w-full p-5 overflow-x-auto">
        <input
          name="minRateDescription"
          className="border-b-2 text-center"
          size={5}
          placeholder="비동의"
          value={element.content.minRateDescription}
          onChange={handleContent}
          disabled={!isEditing}
        ></input>
        {choices.map((choice: any, index: number) => (
          <input
            key={choice.value}
            name="text"
            id={`${index}`}
            type="text"
            className="border border-black rounded-full py-1 m-2 text-center"
            size={1}
            placeholder="0"
            value={choice.text}
            onChange={handleContent}
            disabled={!isEditing}
          ></input>
        ))}
        <input
          name="maxRateDescription"
          className="border-b-2 text-center"
          size={5}
          placeholder="동의"
          value={element.content.maxRateDescription}
          onChange={handleContent}
          disabled={!isEditing}
        ></input>
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

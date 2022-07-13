import React, { useState } from "react";
import { RadioType } from "../types";

type Props = {
  element: RadioType;
  handleQuestion: (id: string) => void;
  currentId: string;
};

export const RadioForm = ({ element, handleQuestion, currentId }: Props) => {
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
        {choices.map((choice: any, index: number) => (
          <div className="m-5">
            <input type="radio" disabled></input>
            <input
              id={`${index}`}
              type="text"
              className="mx-2 border-b-2"
              placeholder="선택지"
              value={choice.text}
              onChange={handleContent}
              disabled={currentId !== element._id}
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
          disabled={currentId !== element._id}
        >
          삭제
        </button>
        <button
          type="button"
          name="rateValues"
          className="border border-blue-500 rounded mx-2 px-2"
          onClick={addValue}
          disabled={currentId !== element._id}
        >
          추가
        </button>
      </div>
    </>
  );
};

import React, { useState } from "react";
import { RatingType } from "../types";

type Props = {
  element: RatingType;
  handleQuestion: (id: string) => void;
  save: boolean;
};

export const RatingForm = ({ element, handleQuestion, save }: Props) => {
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
      <div className="flex place-content-between items-center w-full p-5 overflow-x-scroll">
        <input
          name="minRateDescription"
          className="border-b-2 text-center"
          size={3}
          placeholder="비동의"
          value={element.content.minRateDescription}
          onChange={handleContent}
          disabled={save}
        ></input>
        {choices.map((choice: any, index: number) => (
          <input
            name="text"
            id={`${index}`}
            type="text"
            className="border border-black rounded-full py-1 m-2 text-center"
            size={1}
            placeholder="0"
            value={choice.text}
            onChange={handleContent}
            disabled={save}
          ></input>
        ))}
        <input
          name="maxRateDescription"
          className="border-b-2 text-center"
          size={3}
          placeholder="동의"
          value={element.content.maxRateDescription}
          onChange={handleContent}
          disabled={save}
        ></input>
      </div>
      <div>
        <button
          type="button"
          name="rateValues"
          className="border border-red-500 rounded mx-2 px-2"
          onClick={deleteValue}
          disabled={save}
        >
          삭제
        </button>
        <button
          type="button"
          name="rateValues"
          className="border border-blue-500 rounded mx-2 px-2"
          onClick={addValue}
          disabled={save}
        >
          추가
        </button>
      </div>
    </>
  );
};

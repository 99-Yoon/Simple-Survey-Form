import React, { useState } from "react";
import { DropdownType } from "../types";

type Props = {
  element: DropdownType;
  handleQuestion: (id: string) => void;
};

export const DropdownForm = ({ element, handleQuestion }: Props) => {
  const [choices, setChoices] = useState([...element.content.choices]);

  function handleContent(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    choices[+id].text = value;
    element.content.choices = choices;
    handleQuestion(element._id);
    console.log(choices);
  }
  return (
    <div id="content" className="flex mt-4">
      <select className="mr-3">
        {choices.map((choice: any, index: number) => (
          <option>{choice.text}</option>
        ))}
      </select>
      {choices.map((choice: any, index: number) => (
        <input
          id={`${index}`}
          type="text"
          className="mx-2 border-b-2"
          placeholder={choice.text}
          onChange={handleContent}
        ></input>
      ))}
    </div>
  );
};

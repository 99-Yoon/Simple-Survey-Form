import React, { useState } from "react";
import { CheckboxType } from "../types";

type Props = {
  element: CheckboxType;
  handleQuestion: (id: string) => void;
};

export const CheckboxForm = ({ element, handleQuestion }: Props) => {
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
      {choices.map((choice: any, index: number) => (
        <div>
          <input type="checkbox" disabled></input>
          <input
            id={`${index}`}
            type="text"
            className="mx-2 border-b-2"
            placeholder={choice.text}
            onChange={handleContent}
          ></input>
        </div>
      ))}
    </div>
  );
};

import React, { useState } from "react";
import { RadioType } from "../types";

type Props = {
  element: RadioType;
  handleQuestion: (id: string) => void;
};

export const RadioForm = ({ element, handleQuestion }: Props) => {
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
          <input type="radio" disabled></input>
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

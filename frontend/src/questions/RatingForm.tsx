import React from "react";
import { RatingType } from "../types";

type Props = {
  element: RatingType;
  //   deleteValue: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const QRating = ({ element }: Props) => {
  return (
    <div className="flex place-content-between items-center p-5">
      <input
        name="minRateDescription"
        id={element._id}
        className="border-b-2 text-center"
        size={10}
        placeholder={element.content.minRateDescription}
      ></input>
      {element.content.choices.map((e) => (
        <input
          name="text"
          id={element._id}
          type="text"
          className="border border-black rounded-full py-1 m-2 text-center"
          size={1}
          placeholder={e.text}
        ></input>
      ))}
      <input
        name="maxRateDescription"
        id={element._id}
        className="border-b-2 text-center"
        size={10}
        placeholder={element.content.maxRateDescription}
      ></input>
    </div>
  );
};

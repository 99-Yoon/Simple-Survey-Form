import React from "react";
import { useQuestion } from "./question.context";

type Props = {
  id: string;
};

export const Edit = ({ id }: Props) => {
  const { editClick } = useQuestion();

  return (
    <button id={id} className="w-1/12" onClick={editClick}>
      수정
    </button>
  );
};

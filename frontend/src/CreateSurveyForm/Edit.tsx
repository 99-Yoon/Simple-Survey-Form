import React from "react";

type Props = {
  id: string;
  changeCurrentId: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Edit = ({ id, changeCurrentId }: Props) => {
  return (
    <button id={id} className="" onClick={changeCurrentId}>
      수정
    </button>
  );
};

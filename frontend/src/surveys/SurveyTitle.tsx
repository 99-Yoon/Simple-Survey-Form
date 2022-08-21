import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useState,
} from "react";

type Props = {
  // isEditing: boolean;
  text: string;
  handleTitle: Function;
};

export const SurveyTitle = ({ text, handleTitle }: Props) => {
  const [title, setTitle] = useState(text);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTitle(value);
  };

  const onEdit = () => {
    setDisabled(false);
  };

  const onCancel = () => {
    setDisabled(true);
    setTitle(text);
  };

  const handleClick = () => {
    console.log("title", title);
    setDisabled(true);
    handleTitle(title);
  };

  return (
    <div
      className={`flex flex-col container w-4/5 h-auto border-2 items-center m-3 py-2 rounded-lg ${
        disabled ? "border-themeColor" : "border-red-500"
      }`}
    >
      <input
        type="text"
        name="title"
        className="font-bold text-4xl text-center m-2 border-b-2"
        placeholder="설문지 제목"
        autoComplete="on"
        value={title}
        disabled={disabled}
        onChange={handleChange}
      />
      <div className="flex w-11/12 justify-end">
        {disabled ? (
          <>
            <button type="button" className="px-1" onClick={onEdit}>
              수정
            </button>
          </>
        ) : (
          <>
            <button type="button" className="px-1" onClick={onCancel}>
              취소
            </button>
            <button type="button" className="px-1" onClick={handleClick}>
              확인
            </button>
          </>
        )}
      </div>
    </div>
  );
};

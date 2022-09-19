import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useState,
} from "react";

type Props = {
  // isEditing: boolean;
  title: string;
  comment: string;
  handleTitleComment: Function;
};

export const SurveyTitleAndComment = ({
  comment,
  title,
  handleTitleComment,
}: Props) => {
  const [state, setState] = useState({ title: title, comment: comment });
  const [disabled, setDisabled] = useState(true);

  console.log("title:", title, "comment:", comment, "state:", state);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onEdit = () => {
    setDisabled(false);
  };

  const onCancel = () => {
    setDisabled(true);
    setState({ title, comment });
  };

  const handleConfirm = () => {
    setDisabled(true);
    handleTitleComment(state);
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
        value={state.title}
        disabled={disabled}
        onChange={handleChange}
      />
      <input
        type="text"
        name="comment"
        className="font-bold text-1xl text-center m-2 border-b-2 resize-none"
        placeholder="설문조사에 대한 설명을 입력해주세요"
        autoComplete="on"
        size={50}
        value={state.comment}
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
            <button type="button" className="px-1" onClick={handleConfirm}>
              확인
            </button>
          </>
        )}
      </div>
    </div>
  );
};

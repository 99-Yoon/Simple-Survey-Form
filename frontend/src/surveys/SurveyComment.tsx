import React, { useState } from "react";

export const SurveyComment = () => {
  const [comment, setComment] = useState("");

  const handleChange = () => {};

  return (
    <div>
      <input
        type="text"
        name="comment"
        className="w-11/12 md:w-1/2 font-bold text-1xl text-center m-2 border-b-2 resize-none"
        placeholder="설문조사에 대한 설명을 입력해주세요"
        autoComplete="on"
        size={50}
        value={comment}
        onChange={handleChange}
      />
    </div>
  );
};

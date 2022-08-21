import React from "react";
import { Link } from "react-router-dom";
import { ISurvey } from "../types";
import { DuplicateIcon } from "../icons";

type Props = {
  survey: ISurvey;
  handleDelete: (id: string) => Promise<void>;
};

export const SurveyCard = ({ survey, handleDelete }: Props) => {
  const copyLink = async () => {
    await navigator.clipboard.writeText(
      `http://localhost:8080/answers/${survey._id}`
    );
    alert("설문조사의 링크가 클립보드에 저장되었습니다.");
  };

  const onDelete = async () => {
    survey._id && (await handleDelete(survey._id));
  };

  return (
    <div className="w-40 h-48 md:w-52 md:h-60 rounded border-2 hover:border-2 hover:border-themeColor">
      <Link to={`${survey._id}`} state={survey} className="w-full">
        <p className="font-bold text-center mt-1.5">
          {survey.title ? survey.title : "제목없는 설문조사"}
        </p>

        <div className="h-24 md:h-36 p-3 overflow-y-hidden hover:overflow-y-auto">
          <p className="text-gray-700 text-justify">
            {survey.comment ? survey.comment : "설명없는 설문조사"}
          </p>
        </div>
        <p className="text-gray-500 text-sm text-center">
          {survey.updatedAt?.substring(0, 10)}
        </p>
      </Link>
      <div className="flex justify-end pt-1 pr-1">
        <button className="flex place-self-center" onClick={copyLink}>
          링크복사
          <DuplicateIcon className="w-7 h-7" />
        </button>
        <button
          type="button"
          className="bg-themeColor rounded text-white py-1 px-1.5 ml-1 mr-1.5"
          onClick={onDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

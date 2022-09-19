import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { catchErrors } from "../helpers";
import { SpinnerIcon } from "../icons";
import { CreateQuestionData, ISurvey } from "../types";
import { QuestionsList } from "./QuestionsList";
import { SurveyTitle } from "./SurveyTitle";
import { SurveyTitleAndComment } from "./SurveyTitleAndComment";

type Props = {
  questions: CreateQuestionData[];
  survey: ISurvey;
  addQuestion: () => void;
  deleteQuestion: (id: string) => void;
  handleQuestion: (question: CreateQuestionData) => void;
  handleTitleComment: Function;
};

export const ModifySurveyView = ({
  questions,
  survey,
  addQuestion,
  deleteQuestion,
  handleQuestion,
  handleTitleComment,
}: Props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && (
        <SpinnerIcon className="animate-spin h-5 w-5 mr-1 text-slate" />
      )}
      <form>
        <div className="flex flex-col place-items-center">
          <SurveyTitleAndComment
            title={survey.title}
            comment={survey.comment}
            handleTitleComment={handleTitleComment}
          />
          <QuestionsList
            questions={questions}
            handleQuestion={handleQuestion}
            deleteQuestion={deleteQuestion}
          />
          <button
            type="button"
            onClick={addQuestion}
            className="flex w-4/5 content-center justify-center border-2 border-black h-8 mt-3"
          >
            질문 추가
          </button>
          {error && (
            <div className="text-red-500 text-sm mt-3">
              <p>{error}</p>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

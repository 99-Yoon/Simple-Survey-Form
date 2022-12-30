import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { catchErrors } from "../helpers";
import { SpinnerIcon } from "../icons";
import { CreateQuestionData, ISurvey } from "../types";
import { QuestionsList } from "./QuestionsList";

type Props = {
  surveyData: ISurvey;
  callApi: (surveyData: ISurvey) => Promise<any>;
};

export const ModifySurvey = ({ surveyData, callApi }: Props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [survey, setSurvey] = useState<ISurvey>(surveyData);
  const [questions, setQuestions] = useState<CreateQuestionData[]>(() => {
    const questions = survey.questions;
    return questions.map((question) => ({ ...question, isEditing: false }));
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSurvey({ ...survey, [name]: value });
  };

  const hasIncompleteEditing = () => {
    if (questions.length <= 0) {
      return true;
    }
    const incompleted = questions.some((question) => question.isEditing);
    return incompleted;
  };

  /**
   * 수정된 질문을 입력받아 기존 질문을 대체합니다.
   * @param question 수정할 질문
   * @returns 없음
   */
  const handleQuestion = (question: CreateQuestionData) => {
    const index = questions.findIndex((q) => q._id === question._id);
    if (index < 0) {
      return;
    }
    questions[index] = question;
    console.log("handle question questions:", questions);
    setQuestions([...questions]);
  };

  const addQuestion = () => {
    const question: CreateQuestionData = {
      _id: Math.random().toString(),
      order: questions.length,
      type: "singletext",
      title: "",
      comment: "",
      isRequired: false,
      content: { choices: [] },
      isEditing: true,
    };
    setQuestions([...questions, question]);
  };

  async function deleteQuestion(id: string) {
    const delQuestions = questions.filter((question) => question._id !== id);
    setQuestions(delQuestions);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    survey.questions = questions;
    try {
      setLoading(true);
      const result = await callApi(survey);
      console.log("result:", result);
      navigate("/surveys");
    } catch (error) {
      setLoading(false);
      catchErrors(error, setError);
    }
  };

  const disabled = hasIncompleteEditing();

  return (
    <>
      {loading && (
        <SpinnerIcon className="animate-spin h-5 w-5 mr-1 text-slate" />
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col place-items-center">
          <div className="flex flex-col container place-items-center mt-4">
            <input
              type="text"
              name="title"
              className="w-11/12 md:w-1/2 font-bold text-4xl text-center m-2 border-b-2"
              placeholder="설문지 제목"
              autoComplete="on"
              value={survey.title}
              onChange={handleChange}
            ></input>
            <input
              type="text"
              name="comment"
              className="w-11/12 md:w-1/2 font-bold text-1xl text-center m-2 border-b-2 resize-none"
              placeholder="설문조사에 대한 설명을 입력해주세요"
              autoComplete="on"
              size={50}
              value={survey.comment}
              onChange={handleChange}
            ></input>
          </div>
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
          <button
            type="submit"
            disabled={disabled}
            title={`${disabled ? "완성되지 않은 부분이 존재합니다" : ""}`}
            className="border bg-themeColor my-5 py-2 px-3 disabled:opacity-60 font-bold text-white"
          >
            저장
          </button>
        </div>
      </form>
    </>
  );
};

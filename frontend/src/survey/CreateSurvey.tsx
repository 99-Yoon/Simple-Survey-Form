import React, { FormEvent, useState } from "react";
import { questionApi, surveyApi } from "../apis";
import { Question } from "../questions";
import { BasicQuestionType, SurveyType } from "../types";

export const CreateSurvey = () => {
  const [survey, setSurvey] = useState<SurveyType>({
    title: "",
    comment: "",
    questions: [],
  });

  const handleQuestion = (id: string) => {
    const newList: BasicQuestionType[] = [...survey.questions];
    setSurvey({ ...survey, questions: newList });
  };

  const handleSurvey = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setSurvey({ ...survey, [name]: value });
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const newSurvey: SurveyType = await surveyApi.createSurvey(survey);
      console.log(newSurvey);
      // setSuccess(true);
      // setError("");
    } catch (error) {
      console.log("에러발생");
      // catchErrors(error, setError)
    } finally {
      // setLoading(false);
    }
  }

  async function addQuestion() {
    try {
      const newQuestion: BasicQuestionType = await questionApi.createQuestion();
      setSurvey({ ...survey, questions: [...survey.questions, newQuestion] });
      // setSuccess(true);
      // setError("");
    } catch (error) {
      console.log("에러발생");
      // catchErrors(error, setError)
    } finally {
      // setLoading(false);
    }
  }

  async function deleteQuestion(id: string) {
    const newList: BasicQuestionType[] = [...survey.questions];
    try {
      const newQuestion: BasicQuestionType = await questionApi.deleteQuestion(
        id
      );
      setSurvey({ ...survey, questions: newList.filter((a) => a._id !== id) });
      // setSuccess(true);
      // setError("");
    } catch (error) {
      console.log("에러발생");
      // catchErrors(error, setError)
    } finally {
      // setLoading(false);
    }
  }

  const questions = survey.questions;
  console.log(questions);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col place-items-center">
          <div className="flex flex-col container place-items-center mt-4">
            <input
              type="text"
              name="title"
              className="font-bold text-4xl text-center m-2 border-b-2"
              placeholder="설문지 제목"
              onChange={handleSurvey}
            ></input>
            <input
              type="text"
              name="comment"
              className="font-bold text-1xl text-center m-2 resize-none"
              placeholder="설문조사에 대한 설명을 입력해주세요"
              size={50}
              onChange={handleSurvey}
            ></input>
          </div>
          {questions.map((question) => (
            <Question
              element={question}
              handleQuestion={handleQuestion}
              deleteQuestion={deleteQuestion}
            />
          ))}
          <div className="flex w-4/5 content-center justify-center border-2 border-black h-8 mt-3">
            <button type="button" onClick={addQuestion}>
              질문 추가
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="border bg-themeColor my-5 py-2 px-3 font-bold text-white"
            >
              설문조사 생성
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

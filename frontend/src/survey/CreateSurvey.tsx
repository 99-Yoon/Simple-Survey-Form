import React, { FormEvent, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { questionApi, surveyApi } from "../apis";
import { SpinnerIcon } from "../icons";
import { Question } from "../questions";
import { BasicQuestionType, SurveyType } from "../types";
import { catchErrors } from "../helpers";

export const CreateSurvey = () => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const [isEditing, setIsEditing] =
    useState<{ qid: string; isEditing: boolean }[]>();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<SurveyType>({
    _id: surveyId || "",
    user: {},
    title: "",
    comment: "",
    questions: [],
  });

  useEffect(() => {
    getSurvey();
  }, [surveyId]);

  async function getSurvey() {
    try {
      if (surveyId) {
        const thisSurvey: SurveyType = await surveyApi.getSurvey(surveyId);

        const initEditing = thisSurvey.questions.map((question) => {
          return { qid: question._id, isEditing: false };
        });
        console.log("init editing", initEditing);
        setIsEditing(initEditing);

        setSurvey(thisSurvey);
        setSuccess(true);
        setError("");
      } else {
        setLoading(true);
      }
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  const handleEditing = (qid: string, edited: boolean) => {
    console.log("handle editing:", qid, edited);
    if (isEditing) {
      const index = isEditing.findIndex((q) => q.qid === qid);
      isEditing[index].isEditing = edited;
      setIsEditing([...isEditing]);
    }
  };

  const handleQuestion = (element: BasicQuestionType) => {
    const index = survey.questions.findIndex(
      (question) => question._id === element._id
    );
    survey.questions[index] = element;
    const newList = [...survey.questions];
    console.log("new list in handle question", newList);
    setSurvey({ ...survey, questions: newList });
  };

  const handleSurvey = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setSurvey({ ...survey, [name]: value });
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const newSurvey: SurveyType = await surveyApi.editSurvey(survey);
      console.log(newSurvey);
      setSuccess(true);
      alert("저장되었습니다");
      navigate("/profile");
      setError("");
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  async function addQuestion() {
    try {
      if (surveyId) {
        // const questions: BasicQuestionType[] = await questionApi.createQuestion(
        //   surveyId
        // );
        // console.log(questions);
        const question: BasicQuestionType = await questionApi.createQuestion(
          surveyId
        );
        console.log(question);

        isEditing &&
          setIsEditing([...isEditing, { qid: question._id, isEditing: true }]);

        // setSurvey({ ...survey, questions: questions });
        setSurvey({ ...survey, questions: [...questions, question] });
        setSuccess(true);
        setError("");
      } else {
        setLoading(true);
      }
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  async function deleteQuestion(id: string) {
    const newList: BasicQuestionType[] = [...survey.questions];
    try {
      const newQuestion: BasicQuestionType = await questionApi.deleteQuestion(
        id
      );
      setSurvey({ ...survey, questions: newList.filter((a) => a._id !== id) });
      setSuccess(true);
      setError("");
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  const questions = survey.questions;
  console.log(questions);

  return (
    <>
      {error ? alert(error) : <></>}
      {loading && (
        <SpinnerIcon className="animate-spin h-5 w-5 mr-1 text-slate" />
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col place-items-center">
          <div className="flex flex-col container place-items-center mt-4">
            <input
              type="text"
              name="title"
              className="font-bold text-4xl text-center m-2 border-b-2"
              placeholder="설문지 제목"
              value={survey.title}
              onChange={handleSurvey}
            ></input>
            <input
              type="text"
              name="comment"
              className="font-bold text-1xl text-center m-2 border-b-2   resize-none"
              placeholder="설문조사에 대한 설명을 입력해주세요"
              size={50}
              value={survey.comment}
              onChange={handleSurvey}
            ></input>
          </div>
          {questions.map((question) => (
            <Question
              key={question._id}
              element={question}
              isEditing={
                isEditing?.filter((q) => q.qid === question._id)[0]
                  ?.isEditing ?? true
              }
              handleEditing={handleEditing}
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
              저장하기
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

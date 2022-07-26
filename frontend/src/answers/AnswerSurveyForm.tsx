import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { surveyApi, answerApi } from "../apis";
import { catchErrors } from "../helpers";
import { AnswerSurveyType, AnswerType, SurveyType } from "../types";
import { AQuestion } from "./AQuestion";

export const AnswerSurveyForm = () => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const [files, setFiles] = useState<{ questionId: string; file: File }[]>([]);
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

  const answerSurvey = useRef<AnswerSurveyType>({
    _id: "surveyId",
    user: {},
    title: "",
    comment: "",
    questions: [],
  });

  useEffect(() => {
    ansSurvey();
  }, [surveyId]);

  const isSurvey = sessionStorage.getItem(`survey_${surveyId}`);

  if (isSurvey) {
    console.log("object", isSurvey);
    navigate("/survey/same");
  }

  const addFiles = (oneFile: { questionId: string; file: File }) => {
    if (!files.find((a) => a.questionId === oneFile.questionId)) {
      setFiles([...files, oneFile]);
    }
  };

  async function ansSurvey() {
    try {
      if (surveyId) {
        const getSurvey: any = await surveyApi.ansSurvey(surveyId);
        console.log("survey가져옴ㅎㅎ", getSurvey);
        if (getSurvey) {
          answerSurvey.current._id = getSurvey._id;
          answerSurvey.current.questions = getSurvey.questions;
          setSurvey(getSurvey);
          setSuccess(true);
          setError("");
        }
      } else {
        setLoading(true);
      }
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const answers = answerSurvey.current.questions.map((q: any) => {
      return { questionId: q._id, answer: q.answer, type: q.type };
    });
    const requiredErrorQ = answerSurvey.current.questions.find(
      (q: any) => q.isRequired && q.isRequired !== q.requiredCheck
    );
    if (requiredErrorQ) {
      alert("필수질문에 응답하지 않으셨습니다.");
    } else {
      try {
        const formData = new FormData();
        formData.append("surveyId", answerSurvey.current._id);
        formData.append("guestId", "guest1");
        formData.append("answers", JSON.stringify(answers));
        files.map((f) => {
          formData.append("uploadFiles", f.file);
        });
        const newAnswer: AnswerType = await answerApi.saveAnswers(formData);
        console.log(newAnswer);
        sessionStorage.setItem(`survey_${surveyId}`, surveyId ?? "");
        navigate("/survey/complete");

        setSuccess(true);
        setError("");
      } catch (error) {
        catchErrors(error, setError);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      {console.log("rendering survey form", answerSurvey.current)}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col place-items-center">
          <div className="flex flex-col container place-items-center mt-4">
            <p className="font-bold text-4xl text-center m-2">{survey.title}</p>
            <p className="font-bold text-1xl text-center m-2">
              {survey.comment}
            </p>
            {survey.questions.map((question, index) => {
              return (
                <AQuestion
                  key={question._id}
                  question={question}
                  answerQuestion={answerSurvey.current.questions[index]}
                  addFiles={addFiles}
                ></AQuestion>
              );
            })}
            <div>
              <button
                type="submit"
                className="rounded bg-themeColor my-5 py-2 px-5 font-bold text-white"
              >
                제출하기
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

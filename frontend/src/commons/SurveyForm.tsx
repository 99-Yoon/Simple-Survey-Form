import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { surveyApi } from "../apis";
import { catchErrors } from "../helpers";
import { AnswerType, SurveyType } from "../types";
import { AQuestion } from "./AQuestion";
import { ARadioForm } from "./ARadioForm";

export const SurveyForm = () => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [survey, setSurvey] = useState<SurveyType>({
    _id: surveyId,
    user: {},
    title: "",
    comment: "",
    questions: [],
  });
  const [response, setResponse] = useState<AnswerType>({
    surveyId: surveyId,
    guestId: "",
    answers: [{ questionId: "", answer: "" }],
  });

  useEffect(() => {
    ansSurvey();
  }, [surveyId]);

  async function ansSurvey() {
    try {
      if (surveyId) {
        const answersurvey: SurveyType = await surveyApi.ansSurvey(surveyId);
        console.log(answersurvey);
        const questionIds = answersurvey.questions.map((el) => {
          return { questionId: el._id, answer: "" };
        });
        console.log(questionIds);
        setResponse({
          ...response,
          surveyId: answersurvey._id,
          answers: questionIds,
        });
        setSurvey(answersurvey);
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

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  const handleAnswer = () => {
    const newList = [...response.answers];
    setResponse({ ...response, answers: newList });
  };

  return (
    <>
      {console.log(response)}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col place-items-center">
          <div className="flex flex-col container place-items-center mt-4">
            <p className="font-bold text-4xl text-center m-2">{survey.title}</p>
            <p className="font-bold text-1xl text-center m-2">
              {survey.comment}
            </p>
            {survey.questions.map((question) => {
              return (
                <AQuestion
                  question={question}
                  response={response}
                  handleAnswer={handleAnswer}
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

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { surveyApi } from "../apis";
import { catchErrors } from "../helpers";
import { SpinnerIcon } from "../icons";
import { ISurvey } from "../types";

export const AnswerSurvey = () => {
  let { surveyId } = useParams<{ surveyId: string }>();

  const [survey, setSurvey] = useState<ISurvey>();
  const [error, setError] = useState("");

  useEffect(() => {
    surveyId && getSurvey(surveyId);
  }, [surveyId]);

  const handleSubmit = () => {};

  async function getSurvey(surveyId: string) {
    try {
      setError("");
      const survey: any = await surveyApi.getSurveyById(surveyId);
      console.log("survey가져옴ㅎㅎ", survey);
      // answerSurvey.current._id = survey._id;
      // answerSurvey.current.questions = survey.questions;
      setSurvey(survey);
      // setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      // setLoading(false);
    }
  }

  if (!survey) {
    return (
      <div className="flex justify-center mt-5">
        <SpinnerIcon className="animate-spin h-10 w-10 mr-1 bg-white text-slate-500" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col place-items-center">
        <div className="flex flex-col container place-items-center mt-4">
          <p className="font-bold text-4xl text-center m-2">{survey.title}</p>
          <p className="font-bold text-1xl text-center m-2">{survey.comment}</p>
          {/* {survey.questions.map((question, index) => {
            return (
              <AQuestion
                key={question._id}
                question={question}
                answerQuestion={answerSurvey.current.questions[index]}
                addFiles={addFiles}
              ></AQuestion>
            );
          })} */}
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
  );
};

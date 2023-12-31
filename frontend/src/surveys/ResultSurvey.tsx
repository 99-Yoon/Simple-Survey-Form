import React, { useEffect, useState } from "react";
import { answerApi, surveyApi } from "../apis";
import { catchErrors } from "../helpers";
import { Accordion } from "./Accordion";
import { useParams } from "react-router-dom";
import { ISurvey } from "../types";

export const ResultSurvey = () => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [survey, setSurvey] = useState<ISurvey>({
    _id: surveyId || "",
    user: {},
    title: "",
    comment: "",
    questions: [],
  });

  useEffect(() => {
    getAnswers();
  }, [surveyId]);

  async function getAnswers() {
    try {
      if (surveyId) {
        const result = await answerApi.getAnswers(surveyId);
        console.log(result);
        setSurvey(result);
      } else {
        setLoading(true);
      }
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col place-items-center">
      <div className="flex flex-col container place-items-center mt-4">
        <div className="font-bold text-4xl text-center m-2 border-b-2">
          {survey.title}
        </div>
        <div className="font-bold text-xl text-center m-2 resize-none">
          {survey.comment}
        </div>
      </div>

      <div className="container w-11/12 place-self-center">
        {survey.questions.map((question) => (
          <Accordion key={question._id} question={question} />
        ))}
      </div>
    </div>
  );
};

export default ResultSurvey;

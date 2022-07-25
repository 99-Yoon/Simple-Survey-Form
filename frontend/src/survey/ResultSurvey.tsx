import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { surveyApi } from "../apis";
import { catchErrors } from "../helpers";
import { AnswerType, SurveyType } from "../types";
import Accordion from "./Accordion";

export const ResultSurvey = () => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [survey, setSurvey] = useState<SurveyType>({
    _id: surveyId || "",
    user: {},
    title: "",
    comment: "",
    questions: [],
  });

  useEffect(() => {
    ansSurvey();
  }, [surveyId]);

  async function ansSurvey() {
    try {
      if (surveyId) {
        const getSurvey: any = await surveyApi.ansSurvey(surveyId);
        console.log("survey가져옴ㅎㅎ", getSurvey);
        setSurvey(getSurvey);
      } else {
        setLoading(true);
      }
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }
  const data = [
    {
      title: "1번질문",
      content: "1번 답변들",
    },
    {
      title: "2번질문",
      content: "2번답변들",
    },
    {
      title: "3번질문",
      content: "3번답변들",
    },
  ];
  return (
    <div className="flex flex-col place-items-center">
      <div className="flex flex-col container place-items-center mt-4">
        <div className="font-bold text-4xl text-center m-2 border-b-2">
          {survey.title}
        </div>
        <div className="font-bold text-1xl text-center m-2 resize-none">
          {survey.comment}
        </div>
      </div>

      <div className="container w-11/12 place-self-center">
        {data.map((item) => (
          <Accordion
            key={item.title}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultSurvey;

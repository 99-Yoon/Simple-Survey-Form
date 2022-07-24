import React, { useEffect, useState } from "react";
import { answerApi } from "../apis";
import { catchErrors } from "../helpers";
import Accordion from "./Accordion";
import { useParams } from "react-router-dom";

export const ResultSurvey = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [answers, setAnswers] = useState([
    { _id: "", answers: [], question: {} },
  ]);
  let { surveyId } = useParams<{ surveyId: string }>();
  useEffect(() => {
    getAnswers();
  }, [surveyId]);

  async function getAnswers() {
    try {
      if (surveyId) {
        const answers = await answerApi.getAnswers(surveyId);
        console.log(answers);
        setAnswers(answers);
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
      content:
        "1번 답변들asdfadsgsjadhfasld;nvaldkfnbljgnahgvlajnbl janl;nvja; sabv;jnsvjl;asjvh asjfagkfnjf;nvasgn va;sdn va sglanksvl ds af adb adf afg dgafbg dfh jbvlkna lkslbk kjv nbkkdlfn akdl nvjbnkdjf nlkbakdn bkjnakjn n knk",
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
          설문지 제목
        </div>
        <div className="font-bold text-1xl text-center m-2 resize-none">
          설문조사 설명
        </div>
      </div>

      <div className="container w-11/12 place-self-center">
        {answers.map((item) => (
          <Accordion
            key={item._id}
            question={item.question}
            answers={item.answers}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultSurvey;

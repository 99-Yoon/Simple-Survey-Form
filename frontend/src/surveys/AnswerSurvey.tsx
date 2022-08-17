import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { answerApi, surveyApi } from "../apis";
import { catchErrors } from "../helpers";
import { SpinnerIcon } from "../icons";
import { IAnswer, ISurvey } from "../types";
import { AQuestion } from "./AQuestion";

export const AnswerSurvey = () => {
  let { surveyId } = useParams<{ surveyId: string }>();

  const [survey, setSurvey] = useState<ISurvey>();
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    surveyId && getSurvey(surveyId);
  }, [surveyId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("answers:", answers);
    const needAnswer = answers.some((answer) => !answer.requiredCheck);
    if (needAnswer) {
      alert("필수질문에 응답하셔야 합니다.");
      return;
    }
    if (!survey) {
      return;
    }
    try {
      const fileAnswers = answers.filter(
        (answer) => answer.question.type === "file"
      );
      const otherAnswers = answers.filter(
        (answer) => answer.question.type !== "file"
      );

      console.log("file answers:", fileAnswers);
      console.log("other answers:", otherAnswers);

      const forms = fileAnswers.map((answer) => {
        const formData = new FormData();
        formData.append("surveyId", survey._id!);
        formData.append("questionId", answer.question._id!);
        formData.append("guestId", "guest");

        const files: FileList = answer.content;
        [...files].map((f) => {
          formData.append("uploadFiles", f);
        });
        return formData;
      });

      setError("");
      const results = await answerApi.save(
        otherAnswers.map((answer) => ({
          questionId: answer.question._id!,
          surveyId: survey._id!,
          guestId: "guest",
          content: answer.content,
        }))
      );
      console.log("results:", results);

      const result = await Promise.all(
        forms.map(async (form) => await answerApi.saveForm(form))
      );

      console.log("result:", result);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      // setLoading(false);
    }
  };

  async function getSurvey(surveyId: string) {
    try {
      setError("");
      const survey: ISurvey = await surveyApi.getSurveyById(surveyId);
      console.log("survey가져옴ㅎㅎ", survey);
      const answers = survey.questions.map((question) => {
        return {
          surveyId: survey._id!,
          question: question,
          requiredCheck: false,
          content: null,
        };
      });
      setSurvey(survey);
      setAnswers(answers);
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
          {answers.map((answer) => {
            return (
              <AQuestion
                key={answer.question._id}
                question={answer.question}
                answer={answer}
              />
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
  );
};

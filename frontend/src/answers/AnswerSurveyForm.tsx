import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { surveyApi, answerApi } from "../apis";
import { catchErrors } from "../helpers";
import { AnswerType, SurveyType } from "../types";
import { AQuestion } from "./AQuestion";

export const AnswerSurveyForm = () => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const [files, setFiles] = useState<{ questionId: string; file: File }[]>([]);
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

  const answer = useRef<AnswerType>({
    surveyId: "surveyId",
    guestId: "",
    answers: [],
  });

  const addFiles = (oneFile: { questionId: string; file: File }) => {
    if (!files.find((a) => a.questionId === oneFile.questionId)) {
      setFiles([...files, oneFile]);
    }
  };

  async function ansSurvey() {
    try {
      if (surveyId) {
        const answersurvey: any = await surveyApi.ansSurvey(surveyId);
        console.log(answersurvey);
        const questionIds = answersurvey.questions.map((el: any) => {
          return { questionId: el._id, type: el.type, answer: "" };
        });
        console.log(questionIds);
        if (answersurvey) {
          answer.current.surveyId = answersurvey._id;
          answer.current.guestId = answersurvey.guestId;
          answer.current.answers = questionIds;

          setSurvey(answersurvey);
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

  useEffect(() => {
    ansSurvey();
  }, [surveyId]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("surveyId", answer.current.surveyId);
      formData.append("guestId", "");
      formData.append("answers", JSON.stringify(answer.current.answers));
      files.map((f) => {
        formData.append("files", f.file);
      });
      const newAnswer: AnswerType = await answerApi.saveAnswers(formData);
      // console.log(newAnswer);
      setSuccess(true);
      setError("");
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  const handleAnswer = () => {
    console.log("handle answer:", answer.current);
    // const newList = [...answer.answers];
    // setResponse({ ...answer, answers: newList });
  };

  return (
    <>
      {console.log("rendering survey form", answer.current)}
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
                  key={question._id}
                  element={question}
                  answers={answer.current.answers.find(
                    (ans) => ans.questionId === question._id
                  )}
                  addFiles={addFiles}
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

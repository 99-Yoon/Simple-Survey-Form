import React from "react";
import { CreateQuestionData } from "../types";
import { Question } from "./Question";

type Props = {
  questions: CreateQuestionData[];
  handleQuestion: Function;
  deleteQuestion: Function;
};

export const QuestionsList = ({
  questions,
  handleQuestion,
  deleteQuestion,
}: Props) => {
  return (
    <>
      {questions.map((question) => (
        <Question
          key={question._id}
          element={question}
          handleQuestion={handleQuestion}
          deleteQuestion={deleteQuestion}
        />
      ))}
    </>
  );
};

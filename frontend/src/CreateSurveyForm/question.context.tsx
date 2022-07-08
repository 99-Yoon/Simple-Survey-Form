import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";
import axios from "axios";
import { BasicQuestionType } from "./CreateSurveyFormPage";
import e from "express";

interface IQuestionContext {
  questionListChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  questionList: BasicQuestionType[];
  editClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currentId: string;
  addQuestion: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  questionTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const QuestionContext = createContext<IQuestionContext>({
  questionListChange: () => {},
  questionList: [],
  editClick: () => {},
  currentId: "",
  addQuestion: async () => {},
  questionTypeChange: () => {},
});

export const QuestionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [questionList, setQuestionList] = useState<Array<BasicQuestionType>>(
    []
  );
  const [currentId, setCurrentId] = useState<string>("");

  function questionListChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const newList: BasicQuestionType[] = [...questionList];
    const obj: any = newList.find((a) => a._id === e.target.id); //고유 _id로 질문찾기
    const targetKey: any = e.target.name;
    obj[targetKey] = e.target.value;
    setQuestionList(newList);
  }
  function questionTypeChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const newType: BasicQuestionType[] = [...questionList];
    const objType: any = newType.find((t) => t._id === e.target.id);
    const targetType: string = e.target.name;
    objType[targetType] = e.target.value;
    setQuestionList(newType);
  }

  async function addQuestion(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      const res = await axios.post("/api/questions/create", {
        type: "essay",
        title: "Question Title",
        isRequired: false,
        comment: "질문에 대한 설명을 입력해주세요",
        content: null,
      });
      console.log(res.data);
      setQuestionList([...questionList, res.data]);
      // setSuccess(true);
      // setError("");
    } catch (error) {
      console.log("에러발생");
      // catchErrors(error, setError)
    } finally {
      // setLoading(false);
    }
  }

  function editClick(e: React.MouseEvent<HTMLButtonElement>) {
    setCurrentId(e.currentTarget.id);
  }

  return (
    <QuestionContext.Provider
      value={{
        questionListChange,
        addQuestion,
        questionList,
        editClick,
        currentId,
        questionTypeChange,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestion = () => useContext(QuestionContext);

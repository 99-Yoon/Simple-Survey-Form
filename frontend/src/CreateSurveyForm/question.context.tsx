import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";
import axios from "axios";
import { BasicQuestionType } from "../types";
import { questionApi } from "../apis";

interface IQuestionContext {
  questionListChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  questionList: BasicQuestionType[];
  editClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currentId: string;
  addQuestion: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const QuestionContext = createContext<IQuestionContext>({
  questionListChange: () => {},
  questionList: [],
  editClick: () => {},
  currentId: "",
  addQuestion: async () => {},
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

  async function addQuestion() {
    try {
      const newQ: BasicQuestionType = await questionApi.createQuestion();
      setQuestionList([...questionList, newQ]);
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
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestion = () => useContext(QuestionContext);

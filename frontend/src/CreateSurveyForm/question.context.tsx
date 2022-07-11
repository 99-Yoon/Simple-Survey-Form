import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";
import { BasicQuestionType, SurveyType, EssayType, RadioType } from "../types";
import { questionApi, surveyApi } from "../apis";

interface questionTypeChangeProp {
  id: string;
  tt: string;
}

interface IQuestionContext {
  handleSurvey: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  questionListChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  questionList: BasicQuestionType[];
  editClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  editCompleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currentId: string;
  addQuestion: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  questionTypeChange: ({ id, tt }: questionTypeChangeProp) => void;
}

const QuestionContext = createContext<IQuestionContext>({
  handleSurvey: () => {},
  handleSubmit: () => {},
  questionListChange: () => {},
  questionList: [],
  editClick: () => {},
  editCompleteClick: () => {},
  currentId: "",
  addQuestion: async () => {},
  questionTypeChange: () => {},
});

export const QuestionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [questionList, setQuestionList] = useState<Array<BasicQuestionType>>(
    []
  );
  const [currentId, setCurrentId] = useState<string>("");
  const [survey, setSurvey] = useState<SurveyType>({
    title: "",
    comment: "",
    //questions 는 _id들의 배열
    questions: [],
  });

  function handleSurvey(event: React.ChangeEvent<HTMLInputElement>) {
    setSurvey({
      ...survey,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const newSurvey: SurveyType = await surveyApi.createSurvey(survey);
      console.log(newSurvey);
      // setSuccess(true);
      // setError("");
    } catch (error) {
      console.log("에러발생");
      // catchErrors(error, setError)
    } finally {
      // setLoading(false);
    }
  }
  //질문 Title, Comment바꾸는 함수
  function questionListChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const newList: BasicQuestionType[] = [...questionList];
    const obj: any = newList.find((a) => a._id === e.target.id); //고유 _id로 질문찾기
    const targetKey: any = e.target.name;
    obj[targetKey] = e.target.value;
    setQuestionList(newList);
  }
  //질문 Type 바꾸는 함수
  function questionTypeChange({ id, tt }: questionTypeChangeProp): void {
    const newType: BasicQuestionType[] = [...questionList];
    const objType: any = newType.find((t) => t._id === id);
    objType.type = tt;
    // TODO
    if ((tt = "essay")) {
      objType.content;
    }
    setQuestionList(newType);
  }

  async function addQuestion() {
    try {
      const newQ: BasicQuestionType = await questionApi.createQuestion();
      setSurvey({ ...survey, questions: [...survey.questions, newQ._id] });
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

  function editCompleteClick(e: React.MouseEvent<HTMLButtonElement>) {}

  return (
    <QuestionContext.Provider
      value={{
        handleSurvey,
        handleSubmit,
        questionListChange,
        addQuestion,
        questionList,
        editClick,
        editCompleteClick,
        currentId,
        questionTypeChange,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestion = () => useContext(QuestionContext);

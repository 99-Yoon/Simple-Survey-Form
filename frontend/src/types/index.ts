import { QUESTION_TYPES } from "../commons";

// 타입 지정
export interface IUser {
  email?: string;
  isLoggedIn: boolean;
  _id?: string;
}

export interface SignupUser {
  email: string;
  name: string;
  password: string;
}

export interface ISurvey {
  _id?: string;
  user: any;
  title: string;
  comment: string;
  questions: IQuestionData[];
  createdAt?: string;
  updatedAt?: string;
}

interface IChoice {
  value: number;
  text: string;
}

interface IBasicContent {
  choices: IChoice[];
  [key: string]: any;
}

export interface IQuestionData {
  _id?: string;
  order: number;
  type: IQuestionType;
  title: string;
  isRequired: boolean;
  comment: string;
  content: IBasicContent;
  // answers?: any;
  [key: string]: string | number | boolean | any;
}

export interface CreateQuestionData extends IQuestionData {
  isEditing: boolean;
}

export interface IEssay extends IQuestionData {}
export interface IDate extends IQuestionData {}
export interface IRadio extends IQuestionData {
  content: IBasicContent & {
    hasOther: boolean;
    otherText: string;
  };
}

export interface ICheckbox extends IQuestionData {
  content: IBasicContent & { maxCount: number };
}

export interface IDropdown extends IQuestionData {
  content: IBasicContent & { hasNone: boolean };
}

export interface IFile extends IQuestionData {
  content: IBasicContent & {
    filename: string;
    value: string;
  };
}

export interface IRating extends IQuestionData {
  content: IBasicContent & {
    minRateDescription: string;
    maxRateDescription: string;
  };
}

export interface IAnswer {
  question: IQuestionData;
  surveyId: string;
  guestId?: string;
  requiredCheck: boolean;
  content: any;
}

export interface IAnswerRequestData {
  questionId: string;
  surveyId: string;
  guestId?: string;
  content: any;
}

// export interface IAnswerSurvey extends ISurvey {
//   questions: IAnswerQuestion[];
// }

// export interface IAnswers {
//   questionId: string;
//   type: string;
//   content: any;
// }

// export interface IAnswer {
//   surveyId: string;
//   guestId: string;
//   answers: IAnswers[];
// }

export interface IAnswerProps {
  element: IQuestionData;
  answer: IAnswer;
  // answers: AnswersType | undefined;
  // handleAnswer: () => void;
}

export interface IQuestionProps {
  element: CreateQuestionData;
  // isEditing: boolean;
  // handleEditing: Function;
  handleQuestion: Function;
  deleteQuestion: Function;
}

export type IQuestionFormProps = Pick<
  IQuestionProps,
  "element" | "handleQuestion"
> & { isEditing: boolean };

export type IQuestionType = keyof typeof QUESTION_TYPES;

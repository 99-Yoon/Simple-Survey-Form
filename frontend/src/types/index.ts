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
  _id: string;
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
  type: string;
  title: string;
  isRequired: boolean;
  comment: string;
  content: IBasicContent;
  // answers?: any;
  [key: string]: string | number | boolean | any;
}

export interface AnswerQuestionType extends IQuestionData {
  requiredCheck: boolean;
  answer: any;
}

export interface AnswerSurveyType extends ISurvey {
  questions: AnswerQuestionType[];
}

export interface IEssay extends IQuestionData {}
export interface IDate extends IQuestionData {}
export interface IRadio extends IQuestionData {
  content: IBasicContent & {
    hasOther: boolean;
    otherText: string;
  };
}

interface IChoices {
  value: number;
  text: string;
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

export interface AnswersType {
  questionId: string;
  type: string;
  answer: any;
}

export interface AnswerType {
  surveyId: string;
  guestId: string;
  answers: AnswersType[];
}

export interface AnswerProps {
  element: IQuestionData;
  answerQuestion: AnswerQuestionType;
  // answers: AnswersType | undefined;
  // handleAnswer: () => void;
}

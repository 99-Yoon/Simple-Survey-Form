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

export interface SurveyType {
  _id: string;
  user: any;
  title: string;
  comment: string;
  questions: BasicQuestionType[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BasicQuestionType {
  type: string;
  _id: string;
  title: string;
  isRequired: boolean;
  comment: string;
  content: any;
  answers?: any;
  [key: string]: string | number | boolean | any;
}

export interface AnswerQuestionType extends BasicQuestionType {
  requiredCheck: boolean;
  answer: any;
}

export interface AnswerSurveyType extends SurveyType {
  questions: AnswerQuestionType[];
}

export interface EssayType extends BasicQuestionType {}
export interface DateType extends BasicQuestionType {}
export interface RadioType extends BasicQuestionType {
  content: {
    choices: {
      value: number;
      text: string;
    }[];
    hasOther: boolean;
    otherText: string;
  };
}

interface IChoices {
  value: number;
  text: string;
}

export interface CheckboxType extends BasicQuestionType {
  content: {
    choices: IChoices[];
    maxCount: number;
  };
}

export interface DropdownType extends BasicQuestionType {
  content: {
    choices: IChoices[];
    hasNone: boolean;
  };
}

export interface FileType extends BasicQuestionType {
  content: {
    filename: string;
    value: string;
  };
}

export interface RatingType extends BasicQuestionType {
  content: {
    choices: {
      value: number;
      text: string;
    }[];
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
  element: BasicQuestionType;
  answerQuestion: AnswerQuestionType;
  // answers: AnswersType | undefined;
  // handleAnswer: () => void;
}

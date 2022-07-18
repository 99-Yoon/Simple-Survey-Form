import { model, Schema, Types } from "mongoose";

export interface IResponse {
  _id?: Types.ObjectId;
  surveyId?: Types.ObjectId;
  questionId?: Types.ObjectId;
  respondent?: string;
  answer?: any;
}

const schema = new Schema<IResponse>(
  {
    surveyId: { type: Schema.Types.ObjectId, ref: "Survey" },
    questionId: { type: Schema.Types.ObjectId, ref: "Question" },
    respondent: { type: String },
    answer: { type: Object },
  },
  { timestamps: true }
);

export default model<IResponse>("Response", schema);

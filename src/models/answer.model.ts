import { model, Schema, Types } from "mongoose";

export interface IAnswer {
  _id?: Types.ObjectId;
  surveyId?: Types.ObjectId;
  questionId?: Types.ObjectId;
  guestId?: string;
  answer?: any;
}

const schema = new Schema<IAnswer>(
  {
    surveyId: { type: Schema.Types.ObjectId, ref: "Survey" },
    questionId: { type: Schema.Types.ObjectId, ref: "Question" },
    guestId: { type: String },
    answer: { type: Object },
  },
  { timestamps: true }
);

export default model<IAnswer>("Answer", schema);

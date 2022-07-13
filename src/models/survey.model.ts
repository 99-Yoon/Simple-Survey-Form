import { model, Schema, Types } from "mongoose";

export interface ISurvey {
  _id?: Types.ObjectId;
  title?: string;
  comment?: string;
  user: Types.ObjectId;
  questions: Types.ObjectId[];
}

const schema = new Schema<ISurvey>({
  title: { type: String },
  comment: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

export default model<ISurvey>("Survey", schema);

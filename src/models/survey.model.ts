import { model, Schema, Types } from "mongoose";

export interface ISurvey {
  title?: string;
  comment?: string;
  // userId: Types.ObjectId;
  questions: Types.ObjectId[];
}

const schema = new Schema<ISurvey>({
  title: { type: String },
  comment: { type: String },
  // userId: { type: Schema.Types.ObjectId, ref: "User" },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

export default model<ISurvey>("Survey", schema);

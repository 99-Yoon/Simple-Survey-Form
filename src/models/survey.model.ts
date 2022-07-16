import { model, Schema, Types } from "mongoose";
import { Question } from ".";

export interface ISurvey {
  _id?: Types.ObjectId;
  title?: string;
  comment?: string;
  user: Types.ObjectId;
  questions: Types.ObjectId[];
}

const schema = new Schema<ISurvey>(
  {
    title: { type: String },
    comment: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

schema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function (next) {
    const doc = await this.model.findOne(this.getFilter());
    const questions = doc.questions;
    await Question.deleteMany({ _id: { $in: questions } });
    next();
  }
);

export default model<ISurvey>("Survey", schema);

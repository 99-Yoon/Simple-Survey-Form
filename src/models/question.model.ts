import { model, ObjectId, Schema, Types } from "mongoose";

export interface IQuestion {
  _id?: Types.ObjectId;
  type: string;
  title?: string;
  isRequired: boolean;
  comment?: string;
  content?: any;
}

const schema = new Schema<IQuestion>(
  {
    type: { type: String },
    title: { type: String },
    isRequired: { type: Boolean },
    comment: { type: String },
    content: { type: Object },
  },
  {
    toJSON: {
      versionKey: false,
    },
  }
);

export default model<IQuestion>("Question", schema);

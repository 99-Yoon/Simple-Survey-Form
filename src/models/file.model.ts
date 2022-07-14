import { model, Schema } from "mongoose";

interface IFile {
  name: string;
  path: string;
}

const schema = new Schema<IFile>(
  {
    name: { type: String },
    path: { type: String },
  },
  { timestamps: true, toJSON: { versionKey: false } }
);

export default model<IFile>("File", schema);

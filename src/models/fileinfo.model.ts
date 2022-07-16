import { model, Schema } from "mongoose";

export interface IFileInfo {
  name: string;
  url: string;
}

const schema = new Schema<IFileInfo>(
  {
    name: { type: String },
    url: { type: String },
  },
  { timestamps: true, toJSON: { versionKey: false } }
);

export default model<IFileInfo>("FileInfo", schema);

import { model, Schema } from "mongoose";

interface IRole {
  name: string;
  priority: number;
}

const schema = new Schema<IRole>(
  {
    name: { type: String, unique: true },
    priority: { type: Number },
  },
  { toJSON: { versionKey: false } }
);

export default model<IRole>("Role", schema);

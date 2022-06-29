import { model, Schema } from "mongoose";

interface IRole {
  name: string;
  priority: number;
}

const schema = new Schema<IRole>({
  name: { type: String },
  priority: { type: Number },
});

export default model<IRole>("Role", schema);

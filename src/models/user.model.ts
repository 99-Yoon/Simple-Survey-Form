import { model, Schema, Types } from "mongoose";

export interface IUser {
  email: string;
  name?: string;
  password: string;
  role?: Types.ObjectId;
  avatar?: Types.ObjectId;
}

const validateEmail = (email: string) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "이메일을 입력해주세요"],
    },
    name: { type: String },
    password: { type: String, required: true, select: false },
    role: { type: Schema.Types.ObjectId, ref: "Role" },
    avatar: { type: Schema.Types.ObjectId, ref: "File" },
  },
  {
    toJSON: {
      versionKey: false,
      transform(doc, ret, options) {
        delete ret.password;
      },
    },
  }
);

export default model<IUser>("User", schema);

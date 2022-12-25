import { model, Schema } from "mongoose";

export interface IOauth {
  socialType: string;
  REST_API_KEY: string;
  REDIRECT_URI: string;
  CLIENT_SECRET_KEY: string;
}

const schema = new Schema<IOauth>(
  {
    socialType: { type: String, unique: true },
    REST_API_KEY: { type: String },
    REDIRECT_URI: { type: String },
    CLIENT_SECRET_KEY: { type: String },
  },
  { toJSON: { versionKey: false } }
);

export default model<IOauth>("Oauth", schema);

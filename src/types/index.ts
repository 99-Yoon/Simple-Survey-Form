import { Request } from "express";
import { Files } from "formidable";

export interface TypedRequest extends Request {
  auth: any;
  user: any;
  files: Files;
}

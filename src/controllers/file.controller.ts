import { NextFunction, Request, Response } from "express";
import formidable from "formidable";
import { isEmpty } from "../helpers";
import { asyncWrap } from "../helpers/asyncWrap";

interface TypedRequest extends Request {
  auth: any;
  user: any;
  files: any;
}

export const fileUpload = asyncWrap(async (req, res, next) => {
  const typedReq = req as TypedRequest;

  const form = formidable();
  await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      console.log("fields", fields);
      console.log("files", files);
      typedReq.body = fields;

      if (isEmpty(files)) {
        typedReq.files = null;
      } else {
        typedReq.files = files;
      }
      resolve(files);
    });
  });
  next();
  return;
});

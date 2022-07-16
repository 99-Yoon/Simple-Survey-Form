import formidable from "formidable";
import { asyncWrap } from "../helpers/asyncWrap";
import { TypedRequest } from "../types";

export const uploadAvatar = asyncWrap(async (reqExp, res, next) => {
  const req = reqExp as TypedRequest;
  const form = formidable({ multiples: false, uploadDir: "uploads" });

  await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      // console.log("fields", fields);
      // console.log("files", files);
      req.body = fields;
      req.files = files;

      resolve(files);
    });
  });
  next();
  return;
});

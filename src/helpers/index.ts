import type { File } from "formidable";

export { asyncWrap } from "./asyncWrap";

export const isEmpty = (obj: any) => {
  return (
    !obj || // 👈 null and undefined check
    (Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype)
  );
};

export const formidableFilesToArray = (files: File | File[]): File[] | null => {
  if (Array.isArray(files)) {
    return files;
  }
  if (isEmpty(files)) {
    return null;
  }
  return [files];
};

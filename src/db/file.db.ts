import formidable from "formidable";
import { HydratedDocument } from "mongoose";
import { FileInfo, IFileInfo } from "../models";

export const createFile = async (file: formidable.File) => {
  const newFile = new FileInfo({
    name: file.originalFilename,
    url: file.newFilename,
  });
  const retFile = await newFile.save();
  return retFile;
};

export const deleteFileById = async (fileId: string) => {
  return await FileInfo.findByIdAndDelete(fileId);
};

export const save = async (fileInfo: HydratedDocument<IFileInfo>) => {
  return await fileInfo.save();
};

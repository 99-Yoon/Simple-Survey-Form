import bcrypt from "bcryptjs";
import { IUser, User } from "../models";

export const createUser = async (user: IUser) => {
  // 비밀번호 암호화
  const hash = await bcrypt.hash(user.password, 10);
  const newUser = await User.create({ email: user.email, password: hash });
  return newUser;
};

export const deleteUserById = async (userId: string) => {
  const deletedUser = await User.findByIdAndDelete(userId);
  return deletedUser;
};

export const findUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export const findUserByEmail = async (
  email: string,
  includePassword: boolean = false
) => {
  let user;
  if (includePassword) {
    user = await User.findOne({ email }).select("+password");
  } else {
    user = await User.findOne({ email });
  }
  return user;
};

export const getUsers = async () => {
  const users = await User.find({});
  return users;
};

export const isUser = async (email: string) => {
  const user = await User.findOne({ email });
  if (user) {
    return true;
  } else {
    return false;
  }
};

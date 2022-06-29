import { IUser, User } from "../models";

export const createUser = async (user: IUser) => {
  const newUser = await User.create(user);
  return newUser;
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

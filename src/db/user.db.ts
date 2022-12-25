import bcrypt from "bcryptjs";
import { IUser, Role, User } from "../models";

export const createUser = async (user: IUser) => {
  // 비밀번호 암호화
  const hash = await bcrypt.hash(user.password, 10);
  // 사용자 역할 추가: 기본값은 "user"
  let userRole = null;
  if (user.role) {
    userRole = await Role.findById(user.role);
  } else {
    userRole = await Role.findOne({ name: "user" });
  }
  const newUser = new User({
    email: user.email,
    password: hash,
    role: userRole,
    avatar: user.avatar,
    socialType: user.socialType,
    isNew: true,
  });
  const retUser = await newUser.save();
  return retUser;
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
  const users = await User.find({}).populate({
    path: "avatar",
    select: "_id name url",
  });
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

export const isValidUserId = async (userId: string) => {
  const user = await User.findById(userId);
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const isSocialType = async (socialType: string, email: string) => {
  const user = await User.findOne({ email, socialType });
  return user;
};

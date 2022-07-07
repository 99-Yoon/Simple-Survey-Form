import { Role, User } from "../models";

export const findRoleById = async (roleId: string) => {
  const role = await Role.findById(roleId);
  return role;
};

export const findRoleByName = async (roleName: string) => {
  const role = await Role.findOne({ name: roleName });
  return role;
};

export const findRoleByUserId = async (userId: string) => {
  const user = await User.findById(userId).populate("role");
  const role = user?.get("role");
  return role;
};

export const getAllRoles = async () => {
  const roles = await Role.find({});
  return roles;
};

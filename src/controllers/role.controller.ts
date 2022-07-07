import { roleDb } from "../db";
import { asyncWrap } from "../helpers";

export const getRoles = asyncWrap(async (req, res, next) => {
  const roles = await roleDb.getAllRoles();
  return res.json(roles);
});

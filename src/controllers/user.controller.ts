import { userDb } from "../db";
import { asyncWrap } from "../helpers/asyncWrap";

export const getUsers = asyncWrap(async (req, res) => {
  const users = await userDb.getUsers();
  return res.json(users);
});

export const createUser = asyncWrap(async (req, res) => {
  const user = req.body;
  console.log("user body", user);
  const newUser = await userDb.createUser(user);
  return res.json(user);
});

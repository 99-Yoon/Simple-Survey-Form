import mongoose from "mongoose";
import { mongoUri } from "../config";
import { userDb, roleDb } from "../db";
import { Role, User } from "../models";

mongoose
  .connect(mongoUri)
  .then(async (mongoose) => {
    // 기존 역할들 모두 삭제
    // console.log("clearing existing all roles");
    // await Role.deleteMany();
    // 기본 역할 생성
    console.log("creating default roles");
    const roles = [
      { name: "admin", priority: 1 },
      { name: "manager", priority: 10 },
      { name: "staff", priority: 100 },
      { name: "user", priority: 1000 },
      { name: "guest", priority: 10000 },
    ];
    // await Role.create(roles);
    const asyncRoles = roles.map(async (role) => {
      console.log("creating role:", role.name, "...");
      await Role.findOneAndUpdate({ name: role.name }, role, { upsert: true });
    });

    await Promise.all(asyncRoles);

    // 기존 사용자 모두 삭제
    // console.log("clearing all users");
    // await User.deleteMany();
    // admin 유저 생성
    console.log("creating the admin user");
    const adminRole = await roleDb.findRoleByName("admin");
    if (!adminRole) {
      throw new Error("admin role not exists");
    }
    const adminUser = {
      email: "admin@example.com",
      password: "asdfasdf",
      name: "Administrator",
      role: adminRole._id,
    };
    await User.findOneAndUpdate({ email: adminUser.email }, adminUser, {
      upsert: true,
    });

    mongoose.connection.close();
  })
  .catch((err) => console.log("mongoose connection error:", err));

export default {};

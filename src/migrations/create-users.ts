import mongoose from "mongoose";
import { mongoUri } from "../config";
import { roleDb, userDb } from "../db";
import { User } from "../models";

mongoose
  .connect(mongoUri)
  .then(async (mongoose) => {
    // 기존 사용자 모두 삭제
    console.log("clearing all users");
    await User.deleteMany();
    // 기본 사용자 생성
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

    await userDb.createUser(adminUser);
    mongoose.connection.close();
  })
  .catch((err) => console.log("mongoose connection error:", err));

export default {};

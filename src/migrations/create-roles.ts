import mongoose from "mongoose";
import { mongoUri } from "../config";
import { userDb, roleDb } from "../db";
import { Role, User } from "../models";

mongoose
  .connect(mongoUri)
  .then(async (mongoose) => {
    // 기존 역할들 모두 삭제
    console.log("clearing existing all roles");
    await Role.deleteMany();
    // 기본 역할 생성
    console.log("creating default roles");
    const roles = [
      { name: "admin", priority: 1 },
      { name: "manager", priority: 10 },
      { name: "staff", priority: 100 },
      { name: "user", priority: 1000 },
      { name: "guest", priority: 10000 },
    ];
    await Role.create(roles);
    mongoose.connection.close();
  })
  .catch((err) => console.log("mongoose connection error:", err));

export default {};

import { connect } from "mongoose";
import { mongoUri } from "../src/config";
import { Role, User } from "../src/models";
import { userDb } from "../src/db";

const roles = [
  ["admin", 1],
  ["manager", 10],
  ["staff", 100],
  ["user", 1000],
  ["guest", 10000],
];

connect(mongoUri)
  .then(async (mongoose) => {
    const adminRole = await Role.findOne({ name: "admin" });
    await userDb.createUser({
      email: "admin@example.com",
      name: "admin",
      role: adminRole?._id,
      password: "asdfasdf",
    });
    await mongoose.disconnect();
  })
  .catch((error) => console.log("롤 초기 생성 에러", error));

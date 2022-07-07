import { connect } from "mongoose";
import { mongoUri } from "../src/config";
import { Role } from "../src/models";

const roles = [
  ["admin", 1],
  ["manager", 10],
  ["staff", 100],
  ["user", 1000],
  ["guest", 10000],
];

connect(mongoUri)
  .then(async (mongoose) => {
    const retRoles = roles.map(async ([name, priority]) => {
      const result = await Role.create({ name, priority });
      return result;
    });
    try {
      await Promise.all(retRoles);
      console.log("roles created successfully.");
    } catch (error) {
      console.log("error:", error);
    } finally {
      await mongoose.disconnect();
    }
  })
  .catch((error) => console.log("롤 초기 생성 에러", error));

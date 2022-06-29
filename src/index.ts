import { connect } from "mongoose";
import app from "./app";
import { mongoUri } from "./config";

connect(mongoUri)
  .then((mgs) => {
    console.log(`Mongoose is connected with version: ${mgs.version}`);
    app.listen(3000, () => {
      console.log(`server is running on port ${3000}`);
    });
  })
  .catch((error) => {
    console.log(`에러: ${error}`);
  });

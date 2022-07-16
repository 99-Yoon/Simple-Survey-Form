import cookieParser from "cookie-parser";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "..", "/uploads")));

app.use("/api", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("익스프레스 에러: ", err);
  res.status(err.statusCode || 500).send(err.message || "서버 에러");
});

app.use(function (req, res, next) {
  res.status(404).send("잘못된 경로를 요청했습니다");
});

export default app;

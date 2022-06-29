import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";
import { asyncWrap } from "../helpers";
import { userDb } from "../db";
import { jwtCofig, envConfig, cookieConfig } from "../config";

export interface TypedRequestAuth<T> extends Request {
  auth: T;
}
export const login = asyncWrap(async (req, res) => {
  const { email, password } = req.body;
  console.log(`email: ${email}, password: ${password}`);
  // 1) 사용자 존재 확인
  const user = await userDb.findUserByEmail(email, true);
  console.log("user =", user);
  if (!user) {
    return res.status(422).send(`${email} 사용자가 존재하지 않습니다`);
  }
  // 2) 비밀번호 확인
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send("잘못된 비밀번호를 입력하셨습니다");
  }
  // 3) 비밀번호가 맞으면 토큰 생성
  const token = jwt.sign({ userId: user.id }, jwtCofig.secret, {
    expiresIn: jwtCofig.expires,
  });
  // 4) 토큰을 쿠키에 저장
  res.cookie(cookieConfig.name, token, {
    maxAge: cookieConfig.maxAge,
    path: "/",
    httpOnly: envConfig.mode === "production",
    secure: envConfig.mode === "production",
  });
  // 5) 사용자 반환
  res.json({
    isLoggedIn: true,
    email: user.email,
  });
});

export const logout = (req: Request, res: Response) => {
  res.clearCookie(cookieConfig.name);
  res.send("Logout Successful");
};

export const requireLogin = asyncWrap(async (reqExp, res, next) => {
  const req = reqExp as TypedRequestAuth<string | JwtPayload>;
  try {
    // 1) 쿠키 토큰 존재 여부 확인
    const token = req.cookies[cookieConfig.name];
    if (!token) {
      throw new Error("토큰이 존재하지 않습니다");
    }
    // 2) 쿠키 유효성 검사
    const decodedUser = jwt.verify(token, jwtCofig.secret);
    // 3) 요청 객체에 토큰 사용자 객체 추가
    req.auth = decodedUser;
    next();
  } catch (error) {
    res.clearCookie(cookieConfig.name);
    console.log("error in requreLogin===\n", error);
    return res
      .status(401)
      .json({ message: "로그인이 필요합니다", redirectUrl: "/login" });
  }
});

export const signup = asyncWrap(async (req, res) => {
  const { name, email, password } = req.body;
  // 1) name, email, password 유효성 검사
  if (!isLength(name ?? "", { min: 2, max: 10 })) {
    return res.status(422).send("이름은 2-10자로 입력해주세요");
  } else if (!isLength(password ?? "", { min: 6 })) {
    return res.status(422).send("비밀번호는 6자 이상으로 입력해주세요");
  } else if (!isEmail(email ?? "")) {
    return res.status(422).send("유효하지 않은 이메일입니다");
  }
  // 2) 사용자 중복 확인
  const userExist = await userDb.isUser(email);
  if (userExist) {
    return res.status(422).send(`${email} 사용자가 이미 존재합니다`);
  }
  // 3) 비밀번호 암호화
  const hash = await bcrypt.hash(password, 10);
  // 4) 새로운 사용자 만들기
  const newUser = await userDb.createUser({
    email,
    password: hash,
  });
  // 5) 사용자 반환
  res.json(newUser);
});

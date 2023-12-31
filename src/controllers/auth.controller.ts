import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";
import { asyncWrap } from "../helpers";
import { roleDb, userDb, oauthDb } from "../db";
import { jwtCofig, envConfig, cookieConfig } from "../config";
import axios from "axios";

export interface TypedRequestAuth<T> extends Request {
  auth: T;
  user: any;
}

const REST_API_KEY = process.env.REST_API_KEY as string;
const REDIRECT_URI = process.env.REDIRECT_URI as string;
const CLIENT_SECRET_KEY = process.env.CLIENT_SECRET_KEY as string;
console.log("restapikey", REST_API_KEY);
/**
 * 함수를 호출하기 전에 req에 user 정보를 지정해야 합니다.
 */
export const authenticate = asyncWrap(
  async (reqExp: Request, res: Response, next: NextFunction) => {
    try {
      const req = reqExp as TypedRequestAuth<{ userId: string }>;
      if (req.auth) {
        const { userId } = req.auth;
        const user = req.user;
        if (user && user.id === userId) {
          return next();
        } else {
          throw new Error("권한이 필요합니다");
        }
      } else {
        throw new Error("로그인이 필요합니다");
      }
    } catch (error: any) {
      console.log(error);
      return res.status(401).send(error.message || "권한 없음");
    }
  }
);

/**
 * 지정된 역할 이상으로 권한이 있는지를 판단하는 미들웨어를 반환합니다.
 * @param roleName 역할 문자열
 * @returns 미들웨어
 */
export const hasRole = (roleName: string) => {
  // roleName 이상으로 허락하는 것
  return async (reqExp: Request, res: Response, next: NextFunction) => {
    const req = reqExp as TypedRequestAuth<{ userId: string }>;

    if (!req.auth) {
      return res.status(401).send("로그인이 필요합니다");
    }

    const { userId } = req.auth;
    if (!(await userDb.isValidUserId(userId))) {
      return res.status(401).send("유효한 사용자가 아닙니다");
    }
    const userRole = await roleDb.findRoleByUserId(userId);
    const maxRole = await roleDb.findRoleByName(roleName);
    if (maxRole && Number(maxRole.priority) >= Number(userRole.priority)) {
      return next();
    } else {
      return res.status(401).send("이용 권한이 없습니다");
    }
  };
};

export const login = asyncWrap(async (req, res) => {
  const { email, password } = req.body;
  console.log(`email: ${email}, password: ${password}`);
  // 1) 사용자 존재 확인
  const user = await userDb.findUserByEmail(email, true);
  console.log("user =", user);
  if (!user) {
    return res
      .status(422)
      .send(`${email} 사용자가 존재하지않습니다 회원가입을 해주세요`);
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
    console.log("error in requireLogin===\n", error);
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
  // 3) 비밀번호 암호화는 useDb.createUser에서 처리
  // const hash = await bcrypt.hash(password, 10);
  // 4) 새로운 사용자 만들기
  const newUser = await userDb.createUser({
    email,
    password,
  });
  // 5) 사용자 반환
  res.json(newUser);
});

export const kakaoAuthenticate = asyncWrap(async (req, res) => {
  const code = req.body.code;
  try {
    const socialKeys = await oauthDb.getSocialKey("kakao");
    if (socialKeys) {
      const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: socialKeys.REST_API_KEY,
        redirect_uri: socialKeys.REDIRECT_URI,
        code: code,
        client_secret: socialKeys.CLIENT_SECRET_KEY,
      });
      const kakaoResponse = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        params
      );
      const kakaoUserData = jwt.decode(kakaoResponse.data.id_token) as any;
      console.log(kakaoUserData);
      if (kakaoUserData) {
        // 카카오 계정이든 아니든 같은 이메일이 있는지 확인
        const userExist = await userDb.isUser(kakaoUserData.email);
        if (userExist) {
          // 이메일이 있을 경우
          // 카카오 계정으로 이메일이 있는지 확인
          const kakaoUser = await userDb.isSocialType(
            "kakao",
            kakaoUserData.email
          );
          console.log("카카오 유저: ", kakaoUser);
          if (kakaoUser) {
            // 1) 카카오 유저가 있을 경우 토큰 생성
            const token = jwt.sign({ userId: kakaoUser.id }, jwtCofig.secret, {
              expiresIn: jwtCofig.expires,
            });
            // 2) 토큰을 쿠키에 저장
            res.cookie(cookieConfig.name, token, {
              maxAge: cookieConfig.maxAge,
              path: "/",
              httpOnly: envConfig.mode === "production",
              secure: envConfig.mode === "production",
            });
            // 3) 사용자 반환
            res.json({
              isLoggedIn: true,
              email: kakaoUser.email,
            });
          } else {
            // 카카오 유저가 아닌 다른 이메일 유저일 경우
            return res
              .status(422)
              .send(
                `다른 로그인 방식의 ${kakaoUserData.email} 사용자가 이미 존재합니다`
              );
          }
        } else {
          // 이미 존재하는 이메일이 없을 경우
          // 1) email이랑 password(sub:고유 회원번호) DB에 저장
          const newUser = await userDb.createUser({
            email: kakaoUserData.email,
            password: kakaoUserData.sub,
            socialType: "kakao",
          });
          // 2) 토큰 생성
          const token = jwt.sign({ userId: newUser.id }, jwtCofig.secret, {
            expiresIn: jwtCofig.expires,
          });
          // 3) 토큰을 쿠키에 저장
          res.cookie(cookieConfig.name, token, {
            maxAge: cookieConfig.maxAge,
            path: "/",
            httpOnly: envConfig.mode === "production",
            secure: envConfig.mode === "production",
          });
          // 4) 사용자 반환
          res.json({
            isLoggedIn: true,
            email: newUser.email,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.send("카카오 로그인 에러");
  }
});

export const saveOauthKeys = asyncWrap(async (req, res, next) => {
  console.log(req.body);
  try {
    const oauth = await oauthDb.createSocialKey(req.body);
    console.log(oauth);
    return res.json(oauth);
  } catch (error) {}
});

export const getOauthKeys = asyncWrap(async (req, res, next) => {
  console.log(req.params);
  try {
    const socialKeys = await oauthDb.getSocialKey(req.params.socialType);
    console.log(socialKeys);
    return res.json(socialKeys);
  } catch (error) {}
});

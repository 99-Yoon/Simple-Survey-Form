import axios from "./axios.config";
import { SignupUser } from "../types";
import baseUrl from "./baseUrl";

export const login = async (email: string, password: string) => {
  const { data } = await axios.post(`${baseUrl}/auth/login`, {
    email,
    password,
  });
  return data;
};

export const logout = async () => {
  const { data } = await axios.get(`${baseUrl}/auth/logout`);
  return data;
};

export const signup = async (user: SignupUser) => {
  const { data } = await axios.post(`${baseUrl}/auth/signup`, user);
  return data;
};

export const getKakaoUserData = async (code: string) => {
  const { data } = await axios.post(`${baseUrl}/auth/oauth/kakao`, {
    code: code,
  });
  console.log("data=", data);
  return data.kakaoUserData;
};

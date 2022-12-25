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
  const { data } = await axios.post(`${baseUrl}/auth/oauth/kakao/token`, {
    code: code,
  });
  console.log("data=", data);
  return data;
};

export const saveOauthKeys = async (
  socialType: string,
  REST_API_KEY: string,
  REDIRECT_URI: string,
  CLIENT_SECRET_KEY: string
) => {
  const { data } = await axios.post(`${baseUrl}/auth/oauth`, {
    socialType,
    REST_API_KEY,
    REDIRECT_URI,
    CLIENT_SECRET_KEY,
  });
  return data;
};

export const getOauthKeys = async (socialType: string) => {
  const { data } = await axios.get(`${baseUrl}/auth/oauth/${socialType}`);
  return data;
};

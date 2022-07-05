import axios from "axios";
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
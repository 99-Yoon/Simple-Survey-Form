import React, { useEffect, useState } from "react";
import { authApi } from "../apis";

export const OAuthRedirectHandler = () => {
  const [message, setMessage] = useState(
    "잠시만 기다려 주세요! 로그인 중입니다."
  );
  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(new URL(window.location.href).searchParams.get("code") as string); //인가코드
  }, []);

  useEffect(() => {
    const getKakaoUserData = async (code: string) => {
      const userData = await authApi.getKakaoUserData(code);
      console.log(userData);
    };
    if (code) {
      console.log("code=", code);
      getKakaoUserData(code);
    }
  }, [code]);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

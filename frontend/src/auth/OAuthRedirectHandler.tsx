import React, { useEffect, useState } from "react";
import { authApi } from "../apis";
import { catchErrors } from "../helpers";
const LOCAL_USER_INFO = "survey-user-info";

export const OAuthRedirectHandler = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState(
    "잠시만 기다려 주세요! 로그인 중입니다."
  );
  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(new URL(window.location.href).searchParams.get("code") as string); //인가코드
  }, []);

  useEffect(() => {
    const kakaoLogin = async (code: string) => {
      try {
        const user = await authApi.getKakaoUserData(code);
        console.log(user);
        if (user) {
          localStorage.setItem(
            LOCAL_USER_INFO,
            JSON.stringify({
              isLoggedIn: user.isLoggedIn,
            })
          );
        }
      } catch (error) {
        setLoading(false);
        catchErrors(error, setError);
      }
    };
    if (code) {
      console.log("code=", code);
      kakaoLogin(code);
    }
  }, [code]);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

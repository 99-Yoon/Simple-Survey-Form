import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { catchErrors } from "../helpers";
import { SpinnerIcon } from "../icons";
import { useAuth } from "./auth.context";
import { authApi } from "../apis";
import KakaoLoginImg from "../icons/kakao_login_medium_wide.png";

interface LocationState {
  state: { from: string };
}

export const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation() as LocationState;
  const { login } = useAuth();

  const from = location.state?.from || "/";

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setLoginData({ ...loginData, [name]: value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { email, password } = loginData;
    try {
      setLoading(true);
      await login(email, password, () => navigate(from, { replace: true }));
    } catch (error) {
      setLoading(false);
      catchErrors(error, setError);
    }
  }

  const kakaoLogin = async () => {
    try {
      // DB에서 카카오 API키 받아온 후 전달
      const data = await authApi.getOauthKeys("kakao");
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${data.REST_API_KEY}&redirect_uri=${data.REDIRECT_URI}&response_type=code`;
    } catch (error) {
      setLoading(false);
      catchErrors(error, setError);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl mt-20">로그인</div>
      <form onSubmit={handleSubmit} className="flex flex-col mt-3 w-80">
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-3">
          이메일
        </label>
        <input
          onChange={handleChange}
          className="shadow appearance-none border rounded  py-2 px-3 text-gray-70"
          name="email"
          type="email"
          autoComplete="username"
          placeholder="이메일을 입력하세요"
          value={loginData.email}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-3">
          비밀번호
        </label>
        <input
          onChange={handleChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-70"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="비밀번호를 입력하세요"
          value={loginData.password}
        />
        {error && (
          <div className="text-red-500 text-sm mt-3">
            <p>{error}</p>
          </div>
        )}
        <div className="flex justify-center items-center mt-3">
          {loading && (
            <SpinnerIcon className="animate-spin h-5 w-5 mr-1 text-themeColor" />
          )}
          <button
            type="submit"
            disabled={loading ? true : false}
            className="bg-themeColor text-white border rounded w-full py-2 px-3"
          >
            로그인
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-sm">회원이 아니십니까?</p>
          <Link to={"/signup"} className="text-sm text-themeColor">
            회원가입 →
          </Link>
        </div>
      </form>
      <div>
        <button type="button" onClick={kakaoLogin}>
          <img src={KakaoLoginImg} className="my-2"></img>
        </button>
      </div>
    </div>
  );
};

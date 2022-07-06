import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { catchErrors } from "../helpers";
import { SpinnerIcon } from "../icons";
import { useAuth } from "./auth.context";

export const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setLoginData({ ...loginData, [name]: value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(loginData);
    const { email, password } = loginData;
    try {
      setLoading(true);
      await login(email, password, () => navigate("/", { replace: true }));
    } catch (error) {
      setLoading(false);
      catchErrors(error, setError);
    }
  }

  return (
    <div className="flex justify-center mt-3">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 mt-5 text-xl font-bold"
      >
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
          <div className="text-red-500 text-sm mb-6">
            <p>{error}</p>
          </div>
        )}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading ? true : false}
            className="bg-themeColor text-white border rounded w-100 py-2 px-3 mt-3"
          >
            {loading && (
              <SpinnerIcon className="animate-spin h-5 w-5 mr-1 text-white" />
            )}
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

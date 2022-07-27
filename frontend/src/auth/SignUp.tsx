import React, { FormEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authApi } from "../apis";
import { catchErrors } from "../helpers";
import { SpinnerIcon } from "../icons";
import { SignupUser } from "../types";

export const SignUp = () => {
  const [user, setUser] = useState<SignupUser & { password2: string }>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setDisabled(!(user.name && user.email && user.password && user.password2));
  }, [user]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      setError("");
      console.log("checkPassword:", passwordMatch());
      console.log("user data", user);
      if (passwordMatch()) {
        const { password2, ...sUser } = user;
        setLoading(true);
        const res = await authApi.signup(sUser);
        console.log("서버연결됬나요", res);
        console.log("회원가입");
        setSuccess(true);
        setError("");
      }
    } catch (error) {
      console.log("에러발생");
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  function passwordMatch() {
    if (user.password !== user.password2) {
      setError("비밀번호가 일치하지않습니다");
      console.log("password fail");
      return false;
    } else {
      console.log("password match");
      return true;
    }
  }

  if (success) {
    alert("회원가입 되었습니다");
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl mt-10">회원가입</div>
      <form onSubmit={handleSubmit} className="flex flex-col mt-3 w-80">
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-3">
          이름
        </label>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-70"
          id="name"
          type="text"
          placeholder="이름을 입력하세요"
          onChange={handleChange}
        />
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2 mt-3"
        >
          이메일
        </label>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-70"
          id="email"
          type="text"
          placeholder="이메일을 입력하세요"
          autoComplete="username"
          onChange={handleChange}
        />

        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2 mt-3"
        >
          비밀번호
        </label>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-70"
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="비밀번호를 입력하세요"
          onChange={handleChange}
        />

        <label
          htmlFor="password2"
          className="block text-gray-700 text-sm font-bold mb-2 mt-3"
        >
          비밀번호 확인
        </label>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-70"
          id="password2"
          type="password"
          autoComplete="new-password"
          placeholder="비밀번호를 다시 입력하세요"
          onChange={handleChange}
        />
        {error && (
          <div className="text-red-500 text-sm mt-3">
            <p>{error}</p>
          </div>
        )}
        <div className="text-center mt-3">
          <button
            type="submit"
            className="bg-themeColor text-white border rounded w-100 py-2 px-3 mt-3"
            disabled={disabled}
          >
            {loading && (
              <SpinnerIcon className="animate-spin h-5 w-5 mr-1 text-slate" />
            )}
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

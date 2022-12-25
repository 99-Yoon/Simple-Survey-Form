import React, { useState, ChangeEvent, FormEvent } from "react";
import { authApi } from "../apis";
import { catchErrors } from "../helpers";

export const SocialLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyInfo, setKeyInfo] = useState({
    socialType: "kakao",
    REST_API_KEY: "",
    REDIRECT_URI: "",
    CLIENT_SECRET_KEY: "",
  });
  const handleSubmit = async (e: FormEvent) => {
    const { socialType, REST_API_KEY, REDIRECT_URI, CLIENT_SECRET_KEY } =
      keyInfo;
    try {
      setLoading(true);
      await authApi.saveOauthKeys(
        socialType,
        REST_API_KEY,
        REDIRECT_URI,
        CLIENT_SECRET_KEY
      );
    } catch (error) {
      setLoading(false);
      catchErrors(error, setError);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setKeyInfo({ ...keyInfo, [name]: value });
  };
  return (
    <div className="flex flex-col w-full items-center">
      <div className="text-slate-400 my-3">일단 카카오 로그인만 구현</div>
      <form onSubmit={handleSubmit} className="flex flex-col mt-3 w-80">
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-3">
          REST_API_KEY
        </label>
        <input
          onChange={handleChange}
          className="shadow appearance-none border rounded  py-2 px-3 text-gray-70"
          name="REST_API_KEY"
          type="text"
          placeholder="REST_API_KEY"
          value={keyInfo.REST_API_KEY}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-3">
          REDIRECT_URI
        </label>
        <input
          onChange={handleChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-70"
          name="REDIRECT_URI"
          type="text"
          placeholder="REDIRECT_URI"
          value={keyInfo.REDIRECT_URI}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-3">
          CLIENT_SECRET_KEY
        </label>
        <input
          onChange={handleChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-70"
          name="CLIENT_SECRET_KEY"
          type="text"
          placeholder="CLIENT_SECRET_KEY"
          value={keyInfo.CLIENT_SECRET_KEY}
        />

        <div className="flex justify-center items-center mt-3">
          <button
            type="submit"
            className="bg-themeColor text-white border rounded w-full py-2 px-3"
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
};

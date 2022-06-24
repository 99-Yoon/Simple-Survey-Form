import React from "react";
import "tailwindcss/tailwind.css";

// type LoginProps = {

// };

const LoginPage = () => (
    <div className="flex justify-center mt-3">
        <div className="text-slate-300 text-xl font-bold">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-3">
                이메일
            </label>
            <input
                className="shadow appearance-none border rounded  py-2 px-3 text-gray-70"
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
            />

            <label className="block text-gray-700 text-sm font-bold mb-2 mt-3">
                비밀번호
            </label>
            <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-70"
                id="username"
                type="password"
                placeholder="비밀번호를 입력하세요"
            />
            <div className='text-center'>
                <button className="bg-themeColor text-white border rounded w-100 py-2 px-3 mt-3">로그인</button>
            </div>
        </div>
    </div>
);

export default LoginPage;
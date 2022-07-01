import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type SignUpProps = {};

export const SignUp = ({}: SignUpProps) => {
  const USER = {
    name: "",
    email: "",
    password: "2345",
    password2: "1234",
  };

  const [user, setUser] = useState(USER);
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setDisabled(!(user.name && user.email && user.password && user.password2))
  }, [user])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setUser({...user, [name]: value})
  }
  
  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      // console.log('checkPassword:',checkPassword())
      // const passwordMatch = checkPassword()
      if (passwordmatch()) {
        // const res = await userApi.signup(user)
        // console.log('서버연결됬나요', res)
        console.log('회원가입')
        setSuccess(true)
        setError('')
      }
    } catch (error) {
      console.log('에러발생')
      // catchErrors(error, setError)
    } finally {
      // setLoading(false);
    }
  }
  
  function passwordmatch() {
    if (user.password !== user.password2) {
      alert("비밀번호가 일치하지않습니다");
      console.log("password fail");
      return false;
    } else {
      console.log("password match");
      return true;
    }
  }
  
  if (success) {
    alert('회원가입 되었습니다')
    navigate(`../`)
  }

  return (
    <div className="flex justify-center mt-3">
      <div className="flex flex-col space-y-4 mt-5 text-xl font-bold">
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-3">
          이름
        </label>
        <input
          className="shadow appearance-none border rounded  py-2 px-3 text-gray-60"
          id="name"
          type="text"
          placeholder="이름을 입력하세요"
          onChange={handleChange}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-3">
          이메일
        </label>
        <input
          className="shadow appearance-none border rounded  py-2 px-3 text-gray-70"
          id="email"
          type="text"
          placeholder="이메일을 입력하세요"
          onChange={handleChange}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-3">
          비밀번호
        </label>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-70"
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={handleChange}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-3">
          비밀번호 확인
        </label>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-70"
          id="password2"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          onChange={handleChange}
        />

        <div className="text-center mt-3">
          <button
            className="bg-themeColor text-white border rounded w-100 py-2 px-3 mt-3"
            onClick={handleSubmit}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

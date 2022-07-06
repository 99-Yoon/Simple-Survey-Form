import { authApi } from "../apis";
import { IUser } from "../types";

const LOCAL_USER_INFO = "survey-user-info";

/**
 * 1. 백엔드 로그인을 호출하여 로그인 정보를 얻습니다.
 * 2. 로컬 저장소에 저장합니다.
 * 3. 사용자 정보를 반환합니다.
 * @param email 이메일
 * @param password 비밀번호
 * @returns 사용자 정보
 */
export const handleLogin = async (email: string, password: string) => {
  const user: IUser = await authApi.login(email, password);
  // 로컬 저장소에는 로그인 여부만 저장
  localStorage.setItem(
    LOCAL_USER_INFO,
    JSON.stringify({
      isLoggedIn: user.isLoggedIn,
    })
  );
  return user;
};

/**
 * 로컬 저장소의 정보를 삭제합니다.
 * 백엔드 로그아웃을 호출하여 쿠키를 제거합니다.
 */
export const handleLogout = async () => {
  console.log("handle logout called");
  localStorage.removeItem(LOCAL_USER_INFO);
  try {
    await authApi.logout();
  } catch (error) {
    console.log("logout 중에 에러 발생:", error);
  }
};

/**
 * 1. 로컬 저장소에 저장된 사용자 로그인 정보를 반환합니다.
 * 2. 로컬 저장소에 정보가 없으면 { isLoggedIn: false }를 반환합니다.
 * @returns 로컬 저장소에 저장된 사용자 정보
 */
export const getLocalUser = () => {
  console.log("get local user called");
  const userInfo = localStorage.getItem(LOCAL_USER_INFO);
  const user: IUser = { isLoggedIn: false };
  if (!userInfo) {
    return user;
  }

  const userData = JSON.parse(userInfo);
  if (userData.isLoggedIn) {
    user.isLoggedIn = true;
  } else {
    user.isLoggedIn = false;
  }
  return user;
};

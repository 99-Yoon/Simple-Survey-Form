# 1. 첫 번째 로그인

1. [카카오 로그인] 버튼 클릭 - 'https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code' 으로 접속
2. kakao 쿠키 존재 여부 확인 (첫 로그인에는 존재X)
3. https://accounts.kakao.com/login 접속 및 로그인 인증
4. kakao.com에 종속적으로 쿠키 생성
5. 'https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code'로 돌아와서 동의항목 체크
6. Redirect URI의 주소에 /kakao?code={\*\*\*} code 파라미터에 인가코드 전달됨
7. 인가코드 및 기타 파라미터들을 kauth.kakao.com/oauth/token에 보내고 토큰 받아오기

# 2. 두 번째 로그인부터

1. [카카오 로그인] 버튼 클릭 - 'https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code' 으로 접속
2. kakao 쿠키 존재 여부 확인 (첫 번째 로그인 때 쿠키 생성O)
3. 위 5번부터 동일한 과정 진행

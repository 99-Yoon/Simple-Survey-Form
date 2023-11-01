# SF 프론트엔드, 백엔드 통합 개발 프로젝트

## 주의 사항

1. 새로운 패키지를 설치하기 전에 **반드시** 상의 하세요.

## 프로젝트 깃 클론 한 뒤에 할일

### 프로젝트에 필요한 패키지 설치

다음은 터미널에서 **클론 한 후 단 한번만 실행합니다.**

1. 백엔드 패키지 설치

   ```bash
   npm install
   ```

1. 프론트엔드 패키지 설치

   ```bash
   cd frontend
   npm install
   ```

   다시 루트 디렉토리로 이동

   ```bash
   cd ..
   ```

### 서버 실행

1. 프론트엔드 서버 실행

   ```bash
   cd frontend
   npm run dev
   ```

   다시 루트로 이동

   ```bash
   cd ..
   ```

1. 백엔드 서버 실행

   ```bash
   npm run dev
   ```

## 프로젝트 구조

디렉토리 구조는 대략 다음과 같습니다.

```bash
project_directory
+---dist
|   +---index.js
|   +---app.js
+---frontend
|   +---src
|   |   +---App.tsx
|   |   +---index.html
|   |   \---index.tsx
|   +---package-lock.json
|   +---package.json
|   +---tailwind.config.js
|   +---tsconfig.json
|   +---webpack.common.js
|   +---webpack.dev.js
|   \---webpack.prod.js
+---backend
+---src
|   +---index.ts
|   +---app.ts
+---.gitignore
+---package.json
\---README.md
```

- `src` 폴더는 백엔드 코드들이 들어갑니다.

- `frontend` 폴더는 프론트엔드 코드들이 들어갑니다.

## 프론트엔드 프로젝트 구조

- 되도록이면 기능별로 디렉토리를 만들어 사용합니다. 예를 들면 홈 화면과 관련된 기능들은 home 디렉토리에 위치 시킵니다.

- 그리고 모든 디렉토리에는 `index.tsx`를 만들어 이것을 통해 그 디렉토리에 있는 컴포넌트들을 외부로 `export` 시킵니다. **절대로** 개별적으로 컴포넌트들을 `export` **하지 않도록** 합니다.

- 어떤 디렉토리에 위치시킬지 결정할 수 없을 때는 우선은 `src/commons` 디렉토리에 우선 만들고 나중에 의견을 수렴하여 이동하도록 합니다.

다음은 예제 폴더 구조입니다.

```bash
project_directory
+---dist
|   +---index.js
|   +---app.js
+---frontend
|   +---src
|   |   +---auth
|   |   |   +---index.tsx
|   |   |   +---Login.tsx
|   |   |   +---SignUp.tsx
|   |   +---home
|   |   |   +---index.tsx
|   |   |   +---Home.tsx
|   |   +---index.html
|   |   +---index.tsx
|   |   +---App.tsx
|   |   \---SurveyRouter.tsx
```

- `src/index.tsx`가 프로그램 실행 진입점입니다.
- `src/SurveyRouter.tsx`는 라우트에 관련된 것을 다룹니다.
- `src/App.tsx`가 최상위 레이아웃 입니다.

## 코드 포맷터 설정

### VS Code 설정

VS Code에서 `Ctrl + Shift + p`를 눌러 `기본 설정: 사용자 설정 열기`를 선택하고, `설정 검색` 창에 `editor: format on save`를 검색하여 항목을 선택 합니다. 이 기능은 파일을 저장할 때마다 파일 확장자에 따라서 자동으로 포맷을 맞추고 저장을 합니다.

### Prettier 설치

VS Code 확장에서 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)를 설치합니다.

- `.prettierrc.json` 파일 설정(이미 설정되어 있습니다).
- 대부분의 파일에서 VS Code 맨 아래 상태 바에 Prettier라는 항목이 체크 표시되어 나타나야 합니다.

## 백엔드 데이터베이스

다음은 모두 백엔드 터미널에서 실행해야 합니다. 즉, 프로젝트 루트 디렉토리에서 실행해야 합니다.

### 몽고디비 설치

[몽고디비 윈도우즈 설치](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition)

- 윈도우즈 서비스로 실행하도록 설치합니다.

### 몽고디비 ORM(mongoose) 설치

```bash
npm install mongoose --save
```

## 백엔드 유효성 검사

```bash
npm install validator
npm i -D @types/validator
```

`validator`는 문자열을 검사하는 모듈입니다.

사용방법

```js
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";

export const signup = (req, res) => {
  // 생략
  if (!isLength(name, { min: 2, max: 10 })) {
    return res.status(422).send("이름은 2-10자로 입력해주세요");
  } else if (!isLength(password, { min: 6 })) {
    return res.status(422).send("비밀번호는 6자 이상으로 입력해주세요");
  } else if (!isEmail(email)) {
    return res.status(422).send("유효하지 않은 이메일입니다");
  }
  // 생략
};
```

## 백엔드 비밀번호 암호화

`bcryptjs` 모듈은 암호화합니다.

```bash
npm i bcryptjs
npm i -D @types/bcryptjs
```

사용법

```js
import bcrypt from "bcryptjs";

const hash = await bcrypt.hash(password, 10);
const newUser = await userDb.createUser({
  email,
  password: hash,
});
```

## 백엔드 쿠기 파서

쿠키 파서를 이용해서 쿠키를 해석합니다.

```bash
npm i cookie-parser
npm i -D @types/cookie-parser
```

사용법

```js
// src/app.ts
import cookieParser from "cookie-parser";

app.use(cookieParser());
```

# SF 프론트엔드, 백엔드 통합 개발 프로젝트

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

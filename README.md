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

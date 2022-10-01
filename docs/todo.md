# 할일

## 로드맵

- 서버로 올리기
  - 도커 앱
- 결과 보이기 기능 추가?
  - 사용자 인터페이스는 어떻게 꾸미나?
  - 그래프 라이브러리는 어떤 것을 사용하나?
    - [D3.js](https://d3js.org/): free, steep learning curve
    - [Plotly](https://plotly.com/): free, paid, dependency: D3.js, Stack.gl
    - [Chart.js](https://github.com/chartjs/Chart.js): free, open source, dependency: Moment.js
  - 평균, 표준편차,
  - 그래프: 막대, 꺽은선
- 조건있는 설문지 양식 만들기
- 설문 자료 다운로드(csv) 받기 기능
- 설문 업로드? 기능

## 리덕스

리덕스는 전역 상태를 관리하는 프레임워크입니다.

### 리덕스 데이터 비동기

1. 리덕스와 프론트 api와 연결을 해서 api에서 서버에서 데이터를 가져오면 리덕스 상태를 변경시켜야 하고 변경된 상태가 컴포넌트에 즉시 적용되도록 해야하는 문제를 연구해야 합니다.

   - [리덕스 홈페이지 비동기 로직](https://redux.js.org/tutorials/fundamentals/part-6-async-logic)

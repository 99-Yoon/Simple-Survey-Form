# 개관

![설치](./install.drawio.svg)

## 클라이언트

### `/surveys` 라우트

`SurveysLayout`으로 둘러 싸여 있습니다.

**SurveysLayout**

```js
useEffect(() => {
  await getSurveys()
}, [])
```

`surveysList` 상태를 초기화 하는 과정입니다. 이곳에서 `Outlet context`를 통해서 `surveys`를 내보냅니다.

### `/surveys/:surveyId` 라우트

`SurveyLayout`으로 둘러 싸여 있습니다.

**SurveyLayout**

`SurveysLayout context`로부터 `surveys`를 받아 `surveyId`에 해당하는 `survey` 상태를 뽑아내서 `Outlet context`로 `survey`를 내보냅니다.

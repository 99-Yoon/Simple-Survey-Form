import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { surveyApi } from "../apis";
import { Question } from "../questions";
import { SurveyType } from "../types";
import { ACheckboxForm } from "./ACheckbox";
import { ADropdownForm } from "./ADropdown";
import { AEssayForm } from "./AEssayForm";
import { ARadioForm } from "./ARadioForm";

export const SurveyForm = () => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const [survey, setSurvey] = useState<SurveyType>({
    _id: surveyId,
    user: {},
    title: "",
    comment: "",
    questions: [],
  });
  useEffect(() => {
    getSurvey();
  }, [surveyId]);
  async function getSurvey() {
    try {
      if (surveyId) {
        const thisSurvey: SurveyType = await surveyApi.getASurvey(surveyId);
        console.log(thisSurvey);
        setSurvey(thisSurvey);
        // setSuccess(true);
        // setError("");
      } else {
        // setLoading(true);
      }
    } catch (error) {
      // catchErrors(error, setError);
    } finally {
      // setLoading(false);
    }
  }
  return (
    <div className="flex flex-col place-items-center">
      <div className="flex flex-col container place-items-center mt-4">
        <form className="font-bold text-4xl text-center m-2">설문지 제목</form>
        <textarea
          className="font-bold text-1xl text-center m-2 resize-none"
          placeholder="설문조사에 대한 설명을 입력해주세요"
          rows={2}
          cols={60}
        ></textarea>
        <div>
          <button className="rounded bg-themeColor my-5 py-2 px-5 font-bold text-white">
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
};

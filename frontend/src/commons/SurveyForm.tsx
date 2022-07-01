import React from 'react'

export const SurveyForm = () => (
  <div className='flex justify-center'>
    <div className="flex flex-col space-y-4 mt-5">
      설문조사 이름
      <div className="box-content h-52 w-96 py-4 px-5 border-2 mt-5">
        <form>
          <label>첫번째 질문</label>
        </form>
      </div>
      <div className="box-content h-52 w-96 py-4 px-5 border-2 mt-5">
        <form>
          <label>두번째 질문</label>
        </form>
      </div>
      <div className="box-content h-52 w-96 py-4 px-5 border-2 mt-5">
        <form>
          <label>세번째 질문</label>
        </form>
      </div>
      <div className="text-center t-5">
        <button className="bg-themeColor text-white border rounded py-2 px-6">
          제출
        </button>
      </div>
    </div>
  </div>
)

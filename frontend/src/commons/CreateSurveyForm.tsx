import React from "react";

export const CreateSurveyForm = () => (
<div className="flex flex-col place-items-center">
        <div className="flex flex-col container h-1/2 place-items-center">

            <p className="font-bold text-4xl w-2/3">
                Survey Title
            </p>


            <p className="text-3xl w-2/3">
                Comment
            </p>
        </div>

        <div className="flex flex-col container w-4/5 h-auto border-2 border-black items-center">
            <div className="flex flexgi-row h-16 w-full place-content-between items-center">
                <p className="underline underline-offset-auto text-xl font-bold w-1/2 ml-6">
                    질문
                </p>
                <button className="text-center flex border-2 border-black mr-6 place-content-end">
                    질문종류▽
                </button>

            </div>
            <div className="flex border-2 border-black h-96 w-4/5 mt-4">
                설문내용 뜨는창
            </div>
            <div className="flex w-full flex-row justify-end">
                <button className="w-1/12">필수</button>
                <button className="w-1/12">삭제</button>
            </div>
        </div>

        <div className="flex w-4/5 content-center justify-center border-2 border-black h-8 mt-3">
            질문 추가 +
        </div>

    </div>);

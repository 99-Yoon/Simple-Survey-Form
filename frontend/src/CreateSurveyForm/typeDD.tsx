import React, { ChangeEvent, useState } from "react";
import { useQuestion } from "./question.context";

type typeChangeProps = {
  id: string;
  selectedType: string;
};

export function TypeChange({ selectedType, id }: typeChangeProps) {
  const { questionTypeChange } = useQuestion();

  const typeDD = new Map([
    ["essay", "주관식"],
    ["radio", "객관식"],
    ["dropdown", "드롭다운(객관식)"],
    ["checkbox", "체크박스"],
    ["file", "파일"],
    ["rating", "선형"],
    ["grid", "그리드"],
    ["date", "날짜"],
  ]);

  function changeDD(e: React.ChangeEvent<HTMLSelectElement>) {
    const targetType = e.target.value;
    // questionTypeChange(e);
    console.log(e.target.value);
    console.log(id);
    questionTypeChange({ id, selectedType });
    //if문으로 type별로 content 바뀌게 해보기
  }

  return (
    <select
      id="Questions"
      name="type"
      className="w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full mr-3 p-2.5"
      defaultValue={selectedType}
      onChange={changeDD}
    >
      {Array.from(typeDD.entries()).map(([k, v]) => (
        <option value={k}>{v}</option>
      ))}
    </select>
  );
}

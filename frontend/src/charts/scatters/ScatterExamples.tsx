import React, { useRef, useState } from "react";
import { Button, Comment } from "../commons";
import { generateDataset, generateRandomDataset } from "../helpers";
import { useSize } from "../hooks";
import { ChartV0 } from "./ChartV0";
import { ScatterChart } from "./ScatterChart";

export const ScatterExamples = () => {
  const [dataset, setDataset] = useState(generateRandomDataset(20, 200));
  const target = useRef(null);
  const size = useSize(target);

  const handleClick = () => {
    setDataset(generateDataset());
  };

  // console.log("dataset", dataset);

  return (
    <div>
      <h1>Scatter Chart Examples</h1>
      <Button className="mr-4" onClick={handleClick}>
        새로운 무작위 데이터로 차트를 갱신하려면 클릭하세요.
      </Button>
      <Comment>고정된 데이터에 대해서 scatter plot. 이전 축 적용</Comment>
      <ChartV0 />
      <Comment>resizable이 적용된 scatter plot. 새로운 축 적용.</Comment>
      <div ref={target}>
        <ScatterChart dataset={dataset} dimensions={size} />
      </div>
    </div>
  );
};

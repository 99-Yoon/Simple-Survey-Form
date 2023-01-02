import React, { useRef, useState } from "react";
import { generateDataset1D } from "../helpers";
import { Pie } from "./Pie";

const initDataset = [50, 30, 12, 5, 3];
const nextDataset = [21, 16, 6, 18, 10];

export const PieExample = () => {
  const [dataset, setDataset] = useState(initDataset);
  const toggle = useRef(true);

  const handleClick = () => {
    setDataset(generateDataset1D());
  };

  const handleToggle = () => {
    toggle.current ? setDataset(nextDataset) : setDataset(initDataset);
    toggle.current = !toggle.current;
  };

  return (
    <div>
      <p onClick={handleClick}>새 데이터로 차트를 갱신하려면 클릭하세요</p>
      <p onClick={handleToggle}>데이터 토글</p>
      <Pie data={dataset} />
    </div>
  );
};

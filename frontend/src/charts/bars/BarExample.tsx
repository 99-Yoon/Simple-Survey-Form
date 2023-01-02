import { useRef, useState } from "react";
import { BarChart } from "./BarChart";
import { generateDataset1D } from "../helpers";
import { BarChartWithAnimation } from "./BarChartWithAnimation";
import { Button, Comment } from "../commons";
import { useSize } from "../hooks";

const initDataset = [
  5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
];
const nextDataset = [
  21, 16, 6, 18, 10, 18, 20, 9, 17, 1, 5, 11, 18, 5, 2, 22, 7, 23, 3, 3,
];

export const BarExample = () => {
  const [dataset, setDataset] = useState(initDataset);
  const target = useRef(null);
  const size = useSize(target);
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
      <div className="my-4">
        <Button className="mr-4" onClick={handleClick}>
          새로운 무작위 데이터로 차트를 갱신하려면 클릭하세요.
        </Button>
        <Button onClick={handleToggle}>데이터 토글</Button>
      </div>
      <Comment>
        애니메이션이 들어간 바차트. 문제는 텍스트가 같이 애니메이션이 안된다는
        것입니다.
      </Comment>
      <BarChartWithAnimation dataset={dataset} />
      <Comment>바차트</Comment>
      <div ref={target}>
        <BarChart dataset={dataset} dimensions={size} />
      </div>
    </div>
  );
};

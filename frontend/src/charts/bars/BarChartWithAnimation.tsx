import { max, min, range } from "d3";
import { scaleLinear, scaleBand } from "d3-scale";
import { BarText } from "../texts";
import { BarWithAnimation } from "./BarWithAnimation";

type Props = {
  dataset: number[];
};
export const BarChartWithAnimation = ({ dataset }: Props) => {
  const margin = { top: 20, right: 30, bottom: 20, left: 30 };
  const width = window.innerWidth - margin.left - margin.right;
  const height = 300 - margin.bottom - margin.top;

  const xScale = scaleBand<number>()
    .domain(range(dataset.length))
    .rangeRound([0, width])
    .paddingInner(0.05);
  const yScale = scaleLinear()
    .domain([0, max(dataset) || 0])
    .rangeRound([0, height]);

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.bottom + margin.top}
      style={{ borderWidth: "2px", borderColor: "black" }}
    >
      <BarWithAnimation
        dataset={dataset}
        xScale={xScale}
        yScale={yScale}
        height={height}
      />
      <BarText
        dataset={dataset}
        xScale={xScale}
        yScale={yScale}
        height={height}
      />
    </svg>
  );
};

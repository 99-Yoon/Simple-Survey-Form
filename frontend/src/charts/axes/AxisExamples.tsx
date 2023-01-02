import { Axis, Orient } from "./Axis";
import { BottomAxis } from "./BottomAxis";
import rawData from "../data/data.json";
import { scaleUtc, scaleLinear } from "d3-scale";
import { line } from "d3-shape";
import { max, extent } from "d3";
import useResizeObserver from "../hooks/useResizeObserver";
import { useSize } from "../hooks/useSize";
import { useRef } from "react";
import { useChartDimensions } from "../hooks/useChartDimensions";
import { Comment } from "../commons";
type Record = {
  date: Date;
  value: number;
};

const data = rawData.map((d: any) => {
  return {
    date: new Date(d.date),
    value: +d.value,
  };
}) as Record[];

export const AxisExamples = () => {
  const [target, dimensions] = useChartDimensions({
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 20,
  });
  // console.log("dimensions height=", dimensions.height);
  // const target = useRef(null);
  // const size = useSize(target);
  // console.log("size height=", size?.height);

  // const width = 600;
  // const height = 400;
  const width = dimensions.width || 600;
  const height = dimensions.height || 400;
  const margin = {
    top: dimensions.marginTop,
    right: dimensions.marginRight,
    bottom: dimensions.marginBottom,
    left: dimensions.marginLeft,
  };
  // const width = size?.width || 600;
  // const height = size?.height || 400;
  // const margin = {
  //   top: 20,
  //   right: 20,
  //   bottom: 30,
  //   left: 30,
  // };

  const x = scaleUtc()
    .domain(extent(data, (d) => d.date) as [Date, Date])
    .range([margin.left, width - margin.right]);

  const y = scaleLinear<number>()
    .domain([0, max(data, (d) => d.value)] as [number, number])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const lineXY = line<Record>()
    .defined((d) => !isNaN(d.value))
    .x((d) => x(d.date))
    .y((d) => y(d.value));

  return (
    <div>
      <h1 className="text-3xl">Axis Examples</h1>
      <Comment>Resizable element 적용</Comment>
      <div ref={target} style={{ height: "80vh", border: "1px solid black" }}>
        <svg width={width} height={height}>
          <path
            fill="none"
            stroke="steelblue"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            d={lineXY(data) as string}
          />
          <g transform={`translate(${margin.left},0)`}>
            <Axis scale={y} orient={Orient.left} />
          </g>
          <g transform={`translate(0,${height - margin.bottom})`}>
            <Axis scale={x} orient={Orient.bottom} />
          </g>
        </svg>
      </div>
    </div>
  );
};

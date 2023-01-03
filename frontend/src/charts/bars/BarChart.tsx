import React from "react";
import { max, min, range } from "d3";
import { scaleLinear, scaleBand } from "d3-scale";
import { BarText } from "../texts";
import { Bar } from "./Bar";

type Props = {
  dataset: number[];
  dimensions: DOMRect | undefined;
};

export const BarChart = ({ dataset, dimensions }: Props) => {
  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const width = dimensions?.width || 600;
  const height = dimensions?.height || 300;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.bottom - margin.top;
  console.log("width:", width, "height:", height);

  const xScale = scaleBand<number>()
    .domain(range(dataset.length))
    .rangeRound([0, innerWidth])
    .paddingInner(0.05);
  const yScale = scaleLinear()
    .domain([0, max(dataset) || 0])
    .rangeRound([0, innerHeight]);

  return (
    <div>
      <svg
        width={width}
        height={height}
        // style={{ borderWidth: "2px", borderColor: "black" }}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          <Bar
            dataset={dataset}
            xScale={xScale}
            yScale={yScale}
            height={innerHeight}
          />
          <BarText
            dataset={dataset}
            xScale={xScale}
            yScale={yScale}
            height={innerHeight}
          />
        </g>
      </svg>
    </div>
  );
};

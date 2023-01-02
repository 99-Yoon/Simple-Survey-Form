import { max, min } from "d3";
import { scaleLinear } from "d3-scale";
import React, { useState } from "react";
import { AxisScaleLinear, AxisVerticalScaleLinear } from "../axes";
import { CirclesWithG } from ".";
import { generateRandomDataset } from "../helpers";
import { TextsWithG } from "../texts";

export const ChartV0 = () => {
  const pad = 30;
  const margin = { top: 20, right: 30, bottom: 20, left: 30 };
  const width = window.innerWidth - margin.left - margin.right;
  const height = 300 - margin.bottom - margin.top;

  const [dataset, setDataset] = useState(generateRandomDataset());
  const xMin = min(dataset, (d) => d[0]) || 0;
  const xMax = max(dataset, (d) => d[0]) || 100;
  const yMin = min(dataset, (d) => d[1]) || 0;
  const yMax = max(dataset, (d) => d[1]) || 100;

  const xScale = scaleLinear()
    .domain([0, xMax + 5])
    .nice()
    .range([0, width]);
  const yScale = scaleLinear()
    .domain([0, yMax + 5])
    .nice()
    .range([height, 0]);

  const scaledDataset = dataset.map((d) => [xScale(d[0]), yScale(d[1])]);

  // console.log("dataset:", dataset, "scaled dataset:", scaledDataset);
  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.bottom + margin.top}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <CirclesWithG dataset={scaledDataset} />
        <TextsWithG dataset={dataset} xScale={xScale} yScale={yScale} />
        <AxisVerticalScaleLinear x={0} y={0} scale={yScale} />
        <AxisScaleLinear x={0} y={height} scale={xScale} />
      </g>
    </svg>
  );
};

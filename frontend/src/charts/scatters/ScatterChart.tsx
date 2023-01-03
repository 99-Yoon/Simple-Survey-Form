import { max, min } from "d3";
import { scaleLinear } from "d3-scale";
import React, { useState } from "react";
import {
  Axis,
  AxisScaleLinear,
  AxisVerticalScaleLinear,
  Orient,
} from "../axes";
import { TextsWithG } from "../texts";
import { Circles } from "./Circles";

type Props = {
  dataset: number[][];
  dimensions: DOMRect | undefined;
};

export const ScatterChart = ({ dataset, dimensions }: Props) => {
  const margin = { top: 20, right: 30, bottom: 20, left: 30 };
  const width = dimensions?.width || 600;
  const height = dimensions?.height || 300;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.bottom - margin.top;

  const xMin = min(dataset, (d) => d[0]) || 0;
  const xMax = max(dataset, (d) => d[0]) || 100;
  const yMin = min(dataset, (d) => d[1]) || 0;
  const yMax = max(dataset, (d) => d[1]) || 100;

  const xScale = scaleLinear()
    .domain([0, xMax + 5])
    .nice()
    .range([0, innerWidth]);
  const yScale = scaleLinear()
    .domain([0, yMax + 5])
    .nice()
    .range([innerHeight, 0]);

  // console.log("dataset:", dataset, "scaled dataset:", scaledDataset);
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <Circles dataset={dataset} xScale={xScale} yScale={yScale} />
        <TextsWithG dataset={dataset} xScale={xScale} yScale={yScale} />
      </g>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <Axis scale={yScale} orient={Orient.left} />
      </g>
      <g transform={`translate(${width - margin.right},${margin.top})`}>
        <Axis scale={yScale} orient={Orient.right} />
      </g>
      <g transform={`translate(${margin.left},${height - margin.bottom})`}>
        <Axis scale={xScale} orient={Orient.bottom} />
      </g>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <Axis scale={xScale} orient={Orient.top} />
      </g>
    </svg>
  );
};

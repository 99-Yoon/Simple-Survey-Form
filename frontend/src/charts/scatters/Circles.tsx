import { ScaleLinear } from "d3-scale";
import React from "react";

type Props = {
  dataset: number[][];
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
};

export const Circles = ({ dataset, xScale, yScale }: Props) => {
  return (
    <g>
      {dataset.map((d) => (
        <circle key={d[0]} cx={xScale(d[0])} cy={yScale(d[1])} r={3}></circle>
      ))}
    </g>
  );
};

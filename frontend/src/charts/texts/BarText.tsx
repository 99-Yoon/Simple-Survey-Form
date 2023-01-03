import React from "react";
import { ScaleLinear, ScaleBand } from "d3-scale";

type Props = {
  dataset: number[];
  height: number;
  xScale: ScaleBand<number>;
  yScale: ScaleLinear<number, number>;
};

export const BarText = ({ dataset, height, xScale, yScale }: Props) => {
  return (
    <g fontSize={"15px"} textAnchor="middle" fill="white">
      {dataset.map((d, i) => (
        <text
          key={i}
          x={(xScale(i) ?? 0) + xScale.bandwidth() / 2}
          y={height - yScale(d) + 14}
        >
          {d}
        </text>
      ))}
    </g>
  );
};

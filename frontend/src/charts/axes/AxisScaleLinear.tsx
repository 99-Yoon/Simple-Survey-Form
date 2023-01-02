import React, { useMemo } from "react";
import { ScaleLinear, scaleLinear } from "d3-scale";

type Props = {
  x: number;
  y: number;
  scale: ScaleLinear<number, number>;
};

export const AxisScaleLinear = ({ x = 0, y = 0, scale }: Props) => {
  const orient = "bottom";

  const ticks = useMemo(
    () =>
      scale.ticks().map((value) => ({
        value,
        xOffset: scale(value),
      })),
    []
  );

  // console.log("ticks:", ticks);

  const range = scale.range();

  return (
    <g fontSize="10px" textAnchor="middle" transform={`translate(${x}, ${y})`}>
      <path d={`M ${range[0]} 0.5 H ${range[1]}`} stroke="currentColor" />
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line y2={6} stroke="currentColor" />
          <text key={value} dy="1.5em">
            {value}
          </text>
        </g>
      ))}
    </g>
  );
};

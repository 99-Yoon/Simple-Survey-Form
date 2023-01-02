import React, { useMemo } from "react";
import { ScaleLinear, scaleLinear } from "d3-scale";

type Props = {
  x: number;
  y: number;
  scale: ScaleLinear<number, number>;
};

export const AxisVerticalScaleLinear = ({ x = 0, y = 0, scale }: Props) => {
  const orient = "left";

  const ticks = useMemo(
    () =>
      scale.ticks().map((value) => ({
        value,
        yOffset: scale(value),
      })),
    []
  );

  // console.log("ticks:", ticks);

  const range = scale.range();

  return (
    <g fontSize="10px" textAnchor="middle" transform={`translate(${x}, ${y})`}>
      <path d={`M 0.5 ${range[0]} V ${range[1]}`} stroke="currentColor" />
      {ticks.map(({ value, yOffset }) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          <line x2={-6} stroke="currentColor" />
          <text key={value} dx="-1.5em" dy={"0.3em"}>
            {value}
          </text>
        </g>
      ))}
    </g>
  );
};

import { ScaleBand, ScaleLinear } from "d3-scale";
import React from "react";

type Props = {
  dataset: number[];
  height: number;
  xScale: ScaleBand<number>;
  yScale: ScaleLinear<number, number>;
};

export const Bar = ({ dataset, height, xScale, yScale }: Props) => {
  // console.log("dataset:", dataset);
  return (
    <g>
      {dataset.map((d, i) => {
        console.log("d", d, "i", i, "x:", xScale(i), "y", yScale(d));
        return (
          <rect
            key={i}
            x={xScale(i)}
            y={height - yScale(d)}
            width={xScale.bandwidth()}
            height={yScale(d)}
            fill={`rgb(0, 0, ${Math.round(d * 10)})`}
          ></rect>
        );
      })}
    </g>
  );
};

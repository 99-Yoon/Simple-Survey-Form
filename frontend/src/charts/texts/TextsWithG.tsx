import { ScaleLinear, format } from "d3";
import React from "react";

type Props = {
  dataset: number[][];
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
};

export const TextsWithG = ({ dataset, xScale, yScale }: Props) => {
  // console.log("dataset in texts with g", dataset);
  // const asPercentage = format(".1%");
  const toFixed = format(".1f");

  return (
    <g fontSize={"10px"}>
      {dataset.map((d) => (
        <text key={d[0]} x={xScale(d[0])} y={yScale(d[1])}>{`${toFixed(
          d[0]
        )}, ${toFixed(d[1])}`}</text>
      ))}
    </g>
  );
};

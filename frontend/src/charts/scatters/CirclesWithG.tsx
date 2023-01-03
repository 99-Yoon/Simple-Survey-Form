import React from "react";

type Props = {
  dataset: number[][];
};

export const CirclesWithG = ({ dataset }: Props) => {
  return (
    <g>
      {dataset.map((d) => (
        <circle key={d[0]} cx={d[0]} cy={d[1]} r={3}></circle>
      ))}
    </g>
  );
};

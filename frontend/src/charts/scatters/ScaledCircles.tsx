import React, { useState } from "react";
import { scaleLinear } from "d3-scale";
import { max, min } from "d3";
import { generateRandomDataset } from "../helpers";

export const ScaledCircles = () => {
  const [dataset, setDataset] = useState(generateRandomDataset(30, 1));

  console.log(`dataset:`, dataset);
  const width = 100,
    height = 50,
    r = 1;

  const xPad = 3,
    yPad = 3;

  const xMin = min(dataset, (d) => d[0]) || 0;
  const xMax = max(dataset, (d) => d[0]) || 100;
  const yMin = min(dataset, (d) => d[1]) || 0;
  const yMax = max(dataset, (d) => d[1]) || 50;
  const xScale = scaleLinear()
    .domain([xMin, xMax])
    .range([0 + xMin, width - xPad]);
  const yScale = scaleLinear()
    .domain([yMin, yMax])
    .range([yMin, height - yPad]);

  const rScale = scaleLinear()
    .domain([xMin + yMin, xMax + yMax])
    .range([0, height / 10]);

  return (
    <div style={{ backgroundColor: "gray" }}>
      <svg viewBox={`0 0 ${width + xMin} ${height + 3}`}>
        {dataset.map((d) => (
          <circle
            key={d[0]}
            cx={xScale(d[0])}
            cy={yScale(d[1])}
            r={rScale(d[0] + d[1])}
          ></circle>
        ))}
      </svg>
    </div>
  );
};

import React, { useEffect, useRef, useState } from "react";
import { scaleLinear } from "d3-scale";
import { max, min, axisBottom, select } from "d3";
import { generateRandomDataset } from "../helpers";

export const AxisCirclesD3 = () => {
  const [dataset, setDataset] = useState(generateRandomDataset(30, 1));
  const ref = useRef(null);

  const width = 100,
    height = 50,
    r = 1;

  const xPad = 3,
    yPad = 3;

  const xMin = min(dataset, (d) => d[0]) || 0;
  const xMax = max(dataset, (d) => d[0]) || 100;
  const yMin = min(dataset, (d) => d[1]) || 0;
  const yMax = max(dataset, (d) => d[1]) || 50;

  useEffect(() => {
    const xScale = scaleLinear()
      .domain([xMin, xMax])
      .range([0 + xMin, width - xPad]);
    const yScale = scaleLinear()
      .domain([yMin, yMax])
      .range([yMin, height - yPad]);

    const rScale = scaleLinear()
      .domain([xMin + yMin, xMax + yMax])
      .range([0, height / 10]);

    const svgElmt = select(ref.current);
    const xAxis = axisBottom(xScale);
    svgElmt.append("g").call(xAxis);
  }, []);

  return (
    <div style={{ backgroundColor: "gray" }}>
      <svg ref={ref} viewBox={`0 0 ${width + xMin} ${height + 3}`}></svg>
    </div>
  );
};

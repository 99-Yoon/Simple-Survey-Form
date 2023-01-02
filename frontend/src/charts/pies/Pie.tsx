import { scaleLinear } from "d3-scale";
import { arc, pie } from "d3-shape";
import React from "react";
import { Arc } from "./Arc";

type Props = {
  data: any;
};
export const Pie = ({ data }: Props) => {
  const width = 300;
  const height = 300;

  const pieGenerator = pie();
  const arcs = pieGenerator.padAngle(0.1)(data);

  console.log(arcs);
  return (
    <div>
      <h1>Pie</h1>
      <svg width={width} height={height}>
        <g
          transform={`translate(${width / 2},${height / 2})`}
          textAnchor="middle"
          stroke="white"
        >
          {arcs.map((arc, i) => (
            <Arc
              key={i}
              arcData={{ ...arc, innerRadius: 0, outerRadius: 100 }}
              label={String(arc.value)}
              fill={"blue"}
              stroke={"red"}
              strokeWidth={2}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

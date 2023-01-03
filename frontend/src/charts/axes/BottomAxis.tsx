import React from "react";
import { axisBottom } from "d3-axis";
import { scaleLinear } from "d3-scale";

export const BottomAxis = () => {
  let scale = scaleLinear().domain([0, 100]).range([0, 500]);
  let axis = axisBottom(scale);

  console.log("axis:", axis);

  return (
    <div>
      <h1>BottomAxis</h1>
      <svg width="600" height="100">
        <g transform="translate(20, 50)"></g>
      </svg>
    </div>
  );
};

import React from "react";
import { arc, DefaultArcObject, PieArcDatum } from "d3-shape";
// import { DefaultArcObject } from "d3";

interface Props {
  arcData: DefaultArcObject & PieArcDatum<any>;
  label?: string;
  [rest: string]: any;
}

export const Arc = ({ arcData, label, ...rest }: Props) => {
  console.log("rest:", rest);
  const arcGenerator = arc();
  arcGenerator.cornerRadius(5.2);
  const centroid = arcGenerator.centroid({
    ...arcData,
    // startAngle: arcData.startAngle,
    // endAngle: arcData.endAngle,
  });
  const pathData = arcGenerator(arcData);
  // console.log("arcdata:", arcData, "path data:", pathData);
  return (
    <>
      <path d={pathData ?? ""} {...rest}></path>
      {label && (
        <text x={centroid[0]} y={centroid[1]} dy={"0.33em"}>
          {label}
        </text>
      )}
    </>
  );
};

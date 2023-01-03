import { ScaleBand, ScaleLinear } from "d3-scale";
import React, { Fragment, useEffect, useRef } from "react";

type Props = {
  dataset: number[];
  height: number;
  xScale: ScaleBand<number>;
  yScale: ScaleLinear<number, number>;
};

export const BarWithAnimation = ({
  dataset,
  height,
  xScale,
  yScale,
}: Props) => {
  // console.log("dataset:", dataset);
  const preDataset = useRef(dataset);
  useEffect(() => {
    preDataset.current = dataset;
  }, [dataset]);

  const getStyle = (i: number) => {
    const style = {
      // fill: "red",
      animationName: `inmoveleftright-${i}`,
      animationDuration: "1s",
      // animationDirection: "alternate",
      animationIterationCount: "1",
      // transformOrigin: "bottom",
    };
    return style;
  };

  return (
    <g transform={`scale(1, -1) translate(0, ${-height})`}>
      {dataset.map((d, i) => {
        // console.log("d", d, "i", i, "x:", xScale(i), "y", yScale(d));
        return (
          <Fragment key={Math.random()}>
            <style>
              {`
@keyframes inmoveleftright-${i} {
  0% {
    height: ${yScale(preDataset.current[i])}px;
  }
  100% {
    height: ${yScale(d)}px;
  }
}  
`}
            </style>
            <rect
              x={xScale(i)}
              y={0}
              width={xScale.bandwidth()}
              height={yScale(d)}
              fill={`rgb(0, 0, ${Math.round(d * 10)})`}
              style={getStyle(i)}
            ></rect>
          </Fragment>
        );
      })}
    </g>
  );
};

import React, { useEffect, useRef, useState } from "react";
import { select } from "d3-selection";
import { generateDataset } from "../helpers";

export const CirclesWithD3 = () => {
  const [dataset, setDataset] = useState(generateDataset());

  const ref = useRef(null);

  useEffect(() => {
    const svg = select(ref.current);
    svg
      .selectAll("circle")
      .data(dataset)
      .join("circle")
      .attr("cx", (d) => d[0])
      .attr("cy", (d) => d[1])
      .attr("r", 3);
  }, [dataset]);

  return <svg viewBox="0 0 100 50" ref={ref} />;
};
